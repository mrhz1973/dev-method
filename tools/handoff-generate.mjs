#!/usr/bin/env node
/**
 * tools/handoff-generate.mjs — Local Handoff Generator v1
 * Safety: read-only except --out file. Never commits, pushes, or launches any runner.
 * Spec: patterns/local-handoff-generator.md
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';
import { execSync } from 'child_process';
import { argv, exit } from 'process';

const HELP = `handoff-generate.mjs — Local Handoff Generator v1

Usage:
  node tools/handoff-generate.mjs \\
    --repo   <OPERATIONAL_PATH>   \\
    --method <METHOD_PATH>        \\
    --implementer windsurf        \\
    [--out <OUTPUT_PATH>]         \\
    [--stdout]                    \\
    [--dry-run]                   \\
    [--next-pass "<override>"]    \\
    [--commit-msg "<override>"]   \\
    [--push-authorized yes|no]    \\
    [--allow-non-git-fixture]     \\
    [--help]

Flags:
  --repo               Absolute path to operational repo (required)
  --method             Path to dev-method repo (required)
  --implementer        windsurf | cursor | claude-code (required)
  --out                Write output to this file; default is stdout
  --stdout             Force output to stdout even if --out is set
  --dry-run            Generate prompt; report no execution was performed; skip --out write
  --next-pass          Override expected-next-pass extracted from discovery docs
  --commit-msg         Override proposed commit message
  --push-authorized    yes | no (default: no)
  --allow-non-git-fixture  Allow --repo to be a non-git directory (test fixtures only)
  --help               Show this help

Safety boundaries enforced:
  - Reads only docs/orchestrator/latest.md and inbox/*.md in the operational repo
  - Read-only git only: rev-parse, branch --show-current, status --short, log -1 --oneline
  - Never stages, commits, pushes, resets, cleans, stashes, deletes, deploys, tags, or releases
  - Never opens .env, *token*, *secret*, credentials* files
  - Never calls provider APIs
  - Never launches Windsurf, Cursor, Claude Code, n8n, or any runner
  - Writes one file only when --out is set and --dry-run is not active

See: patterns/local-handoff-generator.md`.trim();

// ---------------------------------------------------------------------------
// Arg parser
// ---------------------------------------------------------------------------

function toCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function parseArgs(raw) {
  const r = {};
  for (let i = 0; i < raw.length; i++) {
    const a = raw[i];
    if (a === '--help' || a === '-h') { r.help = true; continue; }
    if (a === '--stdout') { r.stdout = true; continue; }
    if (a === '--dry-run') { r.dryRun = true; continue; }
    if (a === '--allow-non-git-fixture') { r.allowNonGitFixture = true; continue; }
    if (a.startsWith('--')) {
      const key = toCamel(a.slice(2));
      const next = raw[i + 1];
      if (next !== undefined && !next.startsWith('--')) { r[key] = next; i++; }
    }
  }
  return r;
}

// ---------------------------------------------------------------------------
// Git (read-only only)
// ---------------------------------------------------------------------------

const ALLOWED_GIT = [
  ['rev-parse', '--show-toplevel'],
  ['branch', '--show-current'],
  ['status', '--short'],
  ['log', '-1', '--oneline'],
];

function runGit(cwd, args) {
  const allowed = ALLOWED_GIT.some(
    ([cmd, flag]) => args[0] === cmd && (flag === undefined || args[1] === flag)
  );
  if (!allowed) throw new Error(`SAFETY: blocked git command: git ${args.join(' ')}`);
  try {
    return execSync(`git ${args.join(' ')}`, {
      cwd, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
  } catch { return ''; }
}

// ---------------------------------------------------------------------------
// Safe file reader
// ---------------------------------------------------------------------------

const SECRET_PAT = [/^\.env$/i, /token/i, /secret/i, /^credentials/i, /\.pem$/i, /\.key$/i, /password/i];

function safeRead(p) {
  const name = (p || '').split(/[/\\]/).pop() || '';
  if (SECRET_PAT.some(r => r.test(name))) throw new Error(`SAFETY: refused to read: ${p}`);
  return existsSync(p) ? readFileSync(p, 'utf8') : null;
}

// ---------------------------------------------------------------------------
// Discovery helpers
// ---------------------------------------------------------------------------

// Extract inbox-filename references from arbitrary text.
// Matches three shapes in order:
//   A. Full path:  docs/orchestrator/inbox/<filename>.md
//   B. Date+time bare name:  YYYY-MM-DD_HHMM[...].md   (common backticked refs)
//   C. Date-only bare name:  YYYY-MM-DD[...].md
// Returns deduplicated filenames in first-seen order.
function extractInboxRefs(text) {
  if (!text) return [];
  const out = [];
  const seen = new Set();
  const add = (name) => { if (!seen.has(name)) { seen.add(name); out.push(name); } };
  const patterns = [
    /docs\/orchestrator\/inbox\/([\w._-]+\.md)/g,
    /(\d{4}-\d{2}-\d{2}_\d{4}[\w._-]+\.md)/g,
    /(\d{4}-\d{2}-\d{2}[\w._-]+\.md)/g,
  ];
  for (const pat of patterns) {
    let m;
    while ((m = pat.exec(text)) !== null) add(m[1]);
  }
  return out;
}

// Slice the top (first / most recent) entry under the "## Ultimo aggiornamento"
// section header. Entries are paragraphs separated by blank lines; the first
// non-blank paragraph is returned. Falls back to '' if header missing.
function extractTopUpdateEntry(latestContent) {
  if (!latestContent) return '';
  const lines = latestContent.split(/\r?\n/);
  const headerPat = /^##\s+(ultimo\s+aggiornamento|latest\s+update|last\s+update)/i;
  const headerIdx = lines.findIndex((l) => headerPat.test(l));
  if (headerIdx === -1) return '';
  let i = headerIdx + 1;
  while (i < lines.length && !lines[i].trim()) i++;
  const start = i;
  while (i < lines.length) {
    if (/^#{1,6}\s/.test(lines[i])) break;
    if (!lines[i].trim()) break;
    i++;
  }
  return lines.slice(start, i).join('\n');
}

// Sort inbox-filename candidates newest-first by leading date-like prefix.
// Filenames using YYYY-MM-DD_HHMM... sort correctly via simple string compare.
function compareInboxDesc(a, b) {
  if (a === b) return 0;
  return a < b ? 1 : -1;
}

function findInboxFile(repoRoot, latestContent) {
  const inboxDir = join(repoRoot, 'docs', 'orchestrator', 'inbox');
  const existsInInbox = (name) => existsSync(join(inboxDir, name));
  const make = (name) => ({ path: join(inboxDir, name), name });

  // 1. Prefer inbox refs found in the top "Ultimo aggiornamento" entry.
  const topEntry = extractTopUpdateEntry(latestContent);
  for (const name of extractInboxRefs(topEntry)) {
    if (existsInInbox(name)) return make(name);
  }

  // 2. Fallback: scan all latest.md references; pick newest by date-like prefix.
  const all = extractInboxRefs(latestContent).filter(existsInInbox);
  if (all.length) {
    all.sort(compareInboxDesc);
    return make(all[0]);
  }

  // 3. Fallback: inbox directory listing, newest by filename.
  if (existsSync(inboxDir)) {
    const files = readdirSync(inboxDir).filter((f) => f.endsWith('.md'));
    files.sort(compareInboxDesc);
    if (files.length) return make(files[0]);
  }

  return null;
}

function extractLine(content, patterns) {
  for (const line of content.split('\n')) {
    if (patterns.some(p => p.test(line))) {
      const i = line.indexOf(':');
      if (i !== -1) {
        const v = line.slice(i + 1).trim();
        if (v) return v;
      }
      const stripped = line.replace(/^[#*\-\s]+/, '').trim();
      return stripped || null;
    }
  }
  return null;
}

function extractBlock(content, patterns) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (patterns.some(p => p.test(lines[i]))) {
      const out = [];
      let j = i + 1;
      while (j < lines.length && !lines[j].match(/^#{1,6}\s/)) {
        if (lines[j].trim()) out.push(lines[j].trim());
        j++;
      }
      return out.length ? out.join('\n') : null;
    }
  }
  return null;
}

function discover(content) {
  return {
    nextPass: extractLine(content, [
      /prossimo/i,
      /next\s+(pass|task|recommended)/i,
      /expected\s+next/i,
    ]),
    allowedFiles: extractBlock(content, [
      /allowed\s+files/i,
      /^#{1,4}[^#]*(allowed|scope)/i,
    ]),
    forbiddenFiles: extractBlock(content, [
      /forbidden\s+(files|paths)/i,
      /^#{1,4}[^#]*forbidden/i,
    ]),
    commitMessage: extractLine(content, [
      /commit\s+message/i,
      /suggested\s+commit/i,
    ]),
    pushAuthorized: (() => {
      const l = content.split('\n').find(ln => /push.*authorized|authorized.*push/i.test(ln));
      if (!l) return null;
      return /\byes\b/i.test(l) ? 'yes' : /\bno\b/i.test(l) ? 'no' : null;
    })(),
  };
}

// ---------------------------------------------------------------------------
// Template loader
// ---------------------------------------------------------------------------

function loadTemplate(methodPath) {
  const p = join(methodPath, 'templates', 'ide-agent-handoff-task.md');
  const content = safeRead(p);
  if (!content) throw new Error(`Template not found: ${p}`);
  const m = content.match(/```\n([\s\S]*?)\n```/);
  return m ? m[1] : content;
}

// ---------------------------------------------------------------------------
// Template filler
// ---------------------------------------------------------------------------

const IMPLEMENTER_LABELS = {
  windsurf: 'Windsurf Cascade',
  cursor: 'Cursor',
  'claude-code': 'Claude Code',
};

function inline(s, fallback) {
  if (!s) return fallback;
  return s.split('\n').map(l => l.trim()).filter(Boolean).join(', ');
}

function fillTemplate(tpl, vals) {
  // Trim trailing whitespace/newlines from discoveryDocs to keep adjacent
  // template prose (e.g. " for current scope") properly spaced after substitution.
  const discoveryDocs = String(vals.discoveryDocs || '').replace(/\s+$/g, '');
  let out = tpl
    .replace(/OPERATIONAL_REPO/g, vals.repoName)
    .replace(/OPERATIONAL_PATH/g, vals.repoPath)
    .replace(/METHOD_REPO_REFERENCE/g, vals.methodPath)
    .replace(/TASK_DISCOVERY_DOCS/g, discoveryDocs)
    .replace(/EXPECTED_NEXT_PASS/g, vals.nextPass)
    .replace(/ALLOWED_FILES/g, vals.allowedFiles)
    .replace(/FORBIDDEN_FILES/g, vals.forbiddenFiles)
    .replace(/COMMIT_MESSAGE/g, vals.commitMsg)
    .replace(/INBOX_RECORD_PATH/g, vals.inboxRecord)
    .replace(/Windsurf Cascade \| Cursor \| Claude Code \| other/, vals.implementerLabel);

  if (vals.pushAuthorized !== 'yes') {
    out = out.replace(
      /- Push origin main after commit \(authorized[^)]*\)\./,
      '- Push: NOT authorized for this task — commit locally only, do not push.'
    );
  }

  if (!out.includes('implementer-standard.md')) {
    out += '\n\nCompletion evidence rule: see prompts/implementer-standard.md § Completion evidence rule.';
  }

  return out;
}

// ---------------------------------------------------------------------------
// Output assembler
// ---------------------------------------------------------------------------

function buildOutput(meta, prompt, opts) {
  const ts = new Date().toISOString();
  const statusStr = (meta.gitStatus || '').trim().replace(/\n/g, '; ') || 'clean';

  return `# Handoff prompt — generated ${ts}

Operational repo:   ${meta.repoName}
Operational path:   ${meta.repoPath}
Git root:           ${meta.gitRoot || '[not resolved]'}
Branch:             ${meta.branch || '[not resolved]'}
Git status:         ${statusStr}
Latest commit:      ${meta.latestCommit || '[not resolved]'}
Method path:        ${meta.methodPath}
Implementer:        ${meta.implementer}
Discovery docs:     ${meta.discoveryDocs.join(', ') || '[none]'}
Output mode:        ${opts.mode}
Push authorized:    ${meta.pushAuthorized}
Human review:       REQUIRED${opts.dryRun ? '\nDry-run mode:       YES — no execution was performed' : ''}

---

## Human review required before paste / execute

This file is generated. Review before pasting into any IDE agent session.

- The generator did NOT execute any implementation.
- The generator did NOT commit, push, deploy, tag, or release anything.
- The generator did NOT launch any implementer (Windsurf, Cursor, Claude Code, etc.).
- Fill in all [TBD] and [TASK NOT RESOLVED] placeholders before use.

---

## Generated prompt

${prompt}

---

## Safety summary

- No implementer launched.
- No mutating git commands run.
- No operational repo files modified${opts.outPath ? ` (except output file: ${opts.outPath})` : ''}.
- No secrets or credentials read intentionally.
- No provider APIs called.
- Read-only git commands: rev-parse --show-toplevel, branch --show-current, status --short, log -1 --oneline.
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = parseArgs(argv.slice(2));

  if (args.help) { console.log(HELP); exit(0); }

  const errs = [];
  if (!args.repo) errs.push('--repo is required');
  if (!args.method) errs.push('--method is required');
  if (!args.implementer) errs.push('--implementer is required (windsurf | cursor | claude-code)');
  if (args.implementer && !IMPLEMENTER_LABELS[args.implementer]) {
    errs.push(`--implementer must be windsurf, cursor, or claude-code (got: ${args.implementer})`);
  }
  if (errs.length) {
    errs.forEach(e => process.stderr.write(`ERROR: ${e}\n`));
    process.stderr.write('\nRun with --help for usage.\n');
    exit(1);
  }

  const repoPath = resolve(args.repo);
  const methodPath = resolve(args.method);

  if (!existsSync(repoPath)) {
    process.stderr.write(`ERROR: --repo not found: ${repoPath}\n`); exit(1);
  }
  if (!existsSync(methodPath)) {
    process.stderr.write(`ERROR: --method not found: ${methodPath}\n`); exit(1);
  }

  let gitRoot = null;
  try { gitRoot = runGit(repoPath, ['rev-parse', '--show-toplevel']); } catch (_) {}

  if (!gitRoot && !args.allowNonGitFixture) {
    process.stderr.write(`ERROR: --repo is not a git repository: ${repoPath}\n`);
    process.stderr.write('Use --allow-non-git-fixture for test fixtures without git.\n');
    exit(1);
  }

  const branch = gitRoot ? runGit(repoPath, ['branch', '--show-current']) : '[fixture — no git]';
  const gitStatus = gitRoot ? runGit(repoPath, ['status', '--short']) : '[fixture — no git]';
  const latestCommit = gitRoot ? runGit(repoPath, ['log', '-1', '--oneline']) : '[fixture — no git]';
  const repoName = repoPath.split(/[/\\]/).filter(Boolean).pop() || repoPath;

  const discoveryDocs = [];
  let nextPass = args.nextPass || null;
  let allowedFiles = null;
  let forbiddenFiles = null;
  let commitMsg = args.commitMsg || null;
  let pushAuthorized = args.pushAuthorized || 'no';
  let inboxRecord = null;

  const latestContent = safeRead(join(repoPath, 'docs', 'orchestrator', 'latest.md'));

  if (latestContent) {
    discoveryDocs.push('docs/orchestrator/latest.md');
    const d = discover(latestContent);
    if (!nextPass) nextPass = d.nextPass;
    if (!allowedFiles) allowedFiles = d.allowedFiles;
    if (!forbiddenFiles) forbiddenFiles = d.forbiddenFiles;
    if (!commitMsg) commitMsg = d.commitMessage;
    if (d.pushAuthorized && pushAuthorized !== 'yes') pushAuthorized = d.pushAuthorized;

    const inbox = findInboxFile(repoPath, latestContent);
    if (inbox) {
      discoveryDocs.push(`docs/orchestrator/inbox/${inbox.name}`);
      inboxRecord = `docs/orchestrator/inbox/${inbox.name}`;
      const inboxContent = safeRead(inbox.path);
      if (inboxContent) {
        const di = discover(inboxContent);
        if (!nextPass) nextPass = di.nextPass;
        if (!allowedFiles) allowedFiles = di.allowedFiles;
        if (!forbiddenFiles) forbiddenFiles = di.forbiddenFiles;
        if (!commitMsg) commitMsg = di.commitMessage;
        if (di.pushAuthorized && pushAuthorized !== 'yes') pushAuthorized = di.pushAuthorized;
      }
    }
  } else {
    process.stderr.write('WARN: docs/orchestrator/latest.md not found — output will use placeholders\n');
  }

  const PLACEHOLDER = '[TASK NOT RESOLVED — human must fill in]';
  const TBD = '[TBD — human must fill in]';

  let tpl;
  try { tpl = loadTemplate(methodPath); }
  catch (e) { process.stderr.write(`ERROR: ${e.message}\n`); exit(1); }

  const prompt = fillTemplate(tpl, {
    repoName,
    repoPath,
    methodPath,
    discoveryDocs: discoveryDocs.join(', ') || '[none]',
    nextPass: nextPass || PLACEHOLDER,
    allowedFiles: inline(allowedFiles, TBD),
    forbiddenFiles: inline(forbiddenFiles, TBD),
    commitMsg: commitMsg || TBD,
    inboxRecord: inboxRecord || '[inbox record — if applicable]',
    implementerLabel: IMPLEMENTER_LABELS[args.implementer],
    pushAuthorized,
  });

  const writeTarget = (!args.dryRun && args.out) ? args.out : null;
  const mode = args.out
    ? (args.dryRun ? `dry-run (would write: ${resolve(args.out)})` : `file: ${resolve(args.out)}`)
    : 'stdout';

  const output = buildOutput(
    {
      repoName, repoPath, gitRoot, branch, gitStatus, latestCommit, methodPath,
      implementer: IMPLEMENTER_LABELS[args.implementer],
      discoveryDocs, pushAuthorized,
    },
    prompt,
    { mode, dryRun: !!args.dryRun, outPath: writeTarget }
  );

  if (writeTarget) {
    writeFileSync(writeTarget, output, 'utf8');
    console.log(`Handoff prompt written to: ${writeTarget}`);
    console.log('HUMAN REVIEW REQUIRED before paste / execute.');
  } else {
    if (args.dryRun && args.out) {
      console.log(`[DRY RUN] Would write to: ${resolve(args.out)}`);
      console.log('[DRY RUN] No file was written. Generated output below:\n');
    }
    process.stdout.write(output);
    if (args.dryRun) process.stdout.write('\n[DRY RUN] No execution was performed.\n');
  }
}

main();
