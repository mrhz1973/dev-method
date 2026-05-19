#!/usr/bin/env node
/**
 * Smoke tests for tools/handoff-generate.mjs — no dependencies.
 * Run: node tests/run-handoff-generator-smoke.mjs
 */

import { execSync } from 'child_process';
import {
  mkdtempSync, mkdirSync, writeFileSync, cpSync, rmSync,
} from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const GENERATOR = join(ROOT, 'tools', 'handoff-generate.mjs');
const METHOD = ROOT;
const FIXTURES = join(ROOT, 'tests', 'fixtures');
const INBOX_NAME = 'smoke-fixture.md';

let passed = 0;
let failed = 0;
const temps = [];

function fail(label, detail) {
  failed++;
  process.stderr.write(`FAIL: ${label}\n`);
  if (detail) process.stderr.write(`  ${detail}\n`);
}

function pass(label) {
  passed++;
  process.stdout.write(`PASS: ${label}\n`);
}

function makeRepo(fixtureFile) {
  const dir = mkdtempSync(join(tmpdir(), 'handoff-smoke-'));
  temps.push(dir);
  const inboxDir = join(dir, 'docs', 'orchestrator', 'inbox');
  mkdirSync(inboxDir, { recursive: true });
  cpSync(join(FIXTURES, fixtureFile), join(inboxDir, INBOX_NAME));
  writeFileSync(
    join(dir, 'docs', 'orchestrator', 'latest.md'),
    `# latest\n\n## Ultimo aggiornamento\n\nRef inbox \`${INBOX_NAME}\`.\n`,
    'utf8'
  );
  return dir;
}

function runHandoff(repo, extraArgs = []) {
  const args = [
    GENERATOR,
    '--repo', repo,
    '--method', METHOD,
    '--implementer', 'cursor',
    '--stdout',
    '--dry-run',
    '--allow-non-git-fixture',
    ...extraArgs,
  ];
  try {
    const out = execSync(`node ${args.map((a) => JSON.stringify(a)).join(' ')}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    return { code: 0, stdout: out, stderr: '' };
  } catch (e) {
    return {
      code: e.status ?? 1,
      stdout: e.stdout?.toString() || '',
      stderr: e.stderr?.toString() || '',
    };
  }
}

function assertIncludes(haystack, needle, label) {
  if (!haystack.includes(needle)) {
    fail(label, `expected output to include: ${needle}`);
    return false;
  }
  pass(label);
  return true;
}

function assertExcludes(haystack, needle, label) {
  if (haystack.includes(needle)) {
    fail(label, `expected output NOT to include: ${needle}`);
    return false;
  }
  pass(label);
  return true;
}

// --- incomplete skeleton ---
{
  const repo = makeRepo('inbox-incomplete.md');
  const r = runHandoff(repo);
  if (r.code !== 0) fail('incomplete: exit 0', `got ${r.code}`);
  else pass('incomplete: exit 0');
  assertIncludes(r.stdout, 'Prompt ready:       no', 'incomplete: Prompt ready no');
  assertIncludes(r.stdout, 'Embedded format:    none', 'incomplete: Embedded format none');
  const r2 = runHandoff(repo, ['--require-ready']);
  if (r2.code !== 2) fail('incomplete --require-ready: exit 2', `got ${r2.code}`);
  else pass('incomplete --require-ready: exit 2');
}

// --- complete structured pending ---
{
  const repo = makeRepo('inbox-complete-structured.md');
  const r = runHandoff(repo);
  if (r.code !== 0) fail('structured pending: exit 0', `got ${r.code}`);
  else pass('structured pending: exit 0');
  assertIncludes(r.stdout, 'Prompt ready:       yes', 'structured pending: Prompt ready yes');
  assertIncludes(r.stdout, 'Embedded format:    structured', 'structured pending: format structured');
  assertIncludes(r.stdout, 'Operation type:     docs-only', 'structured pending: operation type');
  assertIncludes(r.stdout, 'Commit authorized:  yes', 'structured pending: commit yes');
  assertIncludes(r.stdout, 'Push authorized:    yes', 'structured pending: push yes');
  assertIncludes(r.stdout, 'Preferred implementer: Cursor', 'structured pending: implementer normalized');
  const r2 = runHandoff(repo, ['--require-ready']);
  if (r2.code !== 0) fail('structured pending --require-ready: exit 0', `got ${r2.code}`);
  else pass('structured pending --require-ready: exit 0');
}

// --- resolved structured ---
{
  const repo = makeRepo('inbox-resolved-structured.md');
  const r = runHandoff(repo);
  assertIncludes(r.stdout, 'Prompt ready:       no — task status is resolved', 'resolved: Prompt ready no');
  assertIncludes(r.stdout, 'WARNING — prompt not ready', 'resolved: not-ready warning');
  const r2 = runHandoff(repo, ['--require-ready']);
  if (r2.code !== 2) fail('resolved --require-ready: exit 2', `got ${r2.code}`);
  else pass('resolved --require-ready: exit 2');
}

// --- legacy ---
{
  const repo = makeRepo('inbox-legacy.md');
  const r = runHandoff(repo);
  assertIncludes(r.stdout, 'Embedded format:    legacy', 'legacy: Embedded format legacy');
  assertIncludes(r.stdout, 'WARNING — legacy embedded format', 'legacy: deprecation warning');
  assertIncludes(r.stdout, 'dev-method v0.2.0', 'legacy: v0.2.0 mention');
  const r2 = runHandoff(repo, ['--strict-format']);
  if (r2.code !== 4) fail('legacy --strict-format: exit 4', `got ${r2.code} stderr=${r2.stderr}`);
  else pass('legacy --strict-format: exit 4');
  assertIncludes(r2.stderr, 'ERROR: --strict-format: legacy embedded format detected.', 'legacy: strict stderr');
}

// --- structured conflict ---
{
  const repo = makeRepo('inbox-conflict-structured.md');
  const r = runHandoff(repo);
  if (r.code !== 3) fail('conflict: exit 3', `got ${r.code}`);
  else pass('conflict: exit 3');
  assertIncludes(r.stderr, 'ERROR: conflicting structured field Push:', 'conflict: Push error');
}

// --- in-progress ---
{
  const repo = makeRepo('inbox-in-progress-structured.md');
  const r = runHandoff(repo);
  assertIncludes(r.stdout, 'Prompt ready:       no', 'in-progress: Prompt ready no');
  assertIncludes(r.stdout, 'TASK STATUS: in-progress is ambiguous', 'in-progress: reason in warning');
  const r2 = runHandoff(repo, ['--require-ready']);
  if (r2.code !== 2) fail('in-progress --require-ready: exit 2', `got ${r2.code}`);
  else pass('in-progress --require-ready: exit 2');
}

// --- structured Push wins over legacy prose ---
{
  const body = `# x\n\n## Future Handoff Prompt\n\n\`\`\`\nTASK: precedence test\nTASK STATUS: pending\nPush: not authorized\nPush origin main after commit (authorized — push is explicitly authorized).\n\`\`\`\n`;
  const dir = mkdtempSync(join(tmpdir(), 'handoff-smoke-'));
  temps.push(dir);
  const inboxDir = join(dir, 'docs', 'orchestrator', 'inbox');
  mkdirSync(inboxDir, { recursive: true });
  writeFileSync(join(inboxDir, INBOX_NAME), body, 'utf8');
  writeFileSync(join(dir, 'docs', 'orchestrator', 'latest.md'), `## Ultimo aggiornamento\nRef \`${INBOX_NAME}\`.\n`, 'utf8');
  const r = runHandoff(dir);
  assertIncludes(r.stdout, 'Push authorized:    no', 'precedence: structured Push not authorized wins');
}

for (const d of temps) {
  try { rmSync(d, { recursive: true, force: true }); } catch (_) {}
}

process.stdout.write(`\nSmoke summary: ${passed} passed, ${failed} failed\n`);
if (failed > 0) process.exit(1);
