# Agent auto-resume response contract — v1.0 (ScanRuler pilot)

Date: 2026-11-01. Status: proposed reporting contract, **not** a validated Auto-Vai implementation.

## Purpose and adoption

Use this response protocol in the two ongoing ChatGPT conversations: **ScanRuler Airbox Test** and **ScanRuler STL Test 2** (`Tubo Finale.obj`). It is a reusable overlay for `dev-method` and does not alter the stable v0.1.1 tag or CAD acceptance criteria. The conversation remains the execution channel; GitHub/checkpoints remain the durable evidence sources. A separate supervisor may inspect both without inserting messages into execution threads.

## Response format (exact, end-of-message)

On each completed assistant turn that is part of an unfinished or finishing goal, append exactly this plain-text block, with one line per field and no text after the last line:

```text
TMAR_STATUS_V1
CHAT=AIRBOX|STL2
STATE=CONTINUE|WAIT|DONE
WORK=<one concise sentence describing the actual operation/result>
EVIDENCE=<real report/file/check/result reference; or NONE>
CHECKPOINT=<SAVED:full-path|UNCHANGED:last-verified-path|FAILED:reason|NONE>
BLOCKER=<NONE|specific problem and why autonomy cannot proceed>
NEXT=<next safe operation|USER_DECISION|required finishing check>
TMAR_END_STATUS
TMAR_GOAL_CONTINUE | TMAR_GOAL_WAIT | TMAR_GOAL_DONE
```

The **last line is one single exact marker**, never all three. Replace the example alternative notation with the appropriate marker. Do not quote a full marker anywhere earlier in a chat response. Keep fields to one physical line, escape embedded newlines, and never fabricate paths/QA outcomes.

Examples of the final line only:

- `TMAR_GOAL_CONTINUE`: goal still incomplete; next safe action known, including recovery from automatically resolvable tool errors.
- `TMAR_GOAL_WAIT`: human approval/decision needed, unrecoverable or repeated failure, unsafe operation, source identity uncertainty, missing access, or required checkpoint failed.
- `TMAR_GOAL_DONE`: entire user-defined goal complete; outputs exist, re-open or independent validity checks passed, quality gates passed or documented as explicitly waived by authorized user.

## Operational requirements

1. Continue working within a turn rather than ending after arbitrary microsteps. If a response must end and safe tasks remain, use `CONTINUE` and name the exact next operation.
2. Report `WAIT` when a meaningful approval is needed, a step cannot be safely retried, a resource is unavailable, or two identical recovery attempts fail without progress. State the smallest required intervention. A general failure does **not** automatically imply a human intervention if the agent has a safe recovery.
3. `DONE` refers to the **whole** assigned reverse-engineering goal, never only to a subtask, export, one CAD solid, or the end of a tool call. Preserve all part-specific requirements (Airbox: complete required regions/features; STL2: true external surface and nominal 2 mm interior if assigned).
4. Save `.scanruler` and meaningful intermediate exports frequently and **before** any reload/reset/destructive transformation. Target at least every 10 minutes during interactive work when supported; if unsaved changes remain and a reload is necessary, use `WAIT` rather than risk losing work. A saved file must be independently confirmed to exist; `CHECKPOINT=SAVED` must refer to a real artifact.
5. Evidence quality: distinguish geometry topological validity, scan-to-CAD accuracy, nominal design assumptions, coverage, export/reopen tests, and overall task completion; none substitutes for the others.
6. Use a terse user-facing commentary (1–3 sentences) followed by the structured block; keep verbose operational details in local reports and logs.
7. Do not send messages to the other ChatGPT chat. Do not silently change the task, tolerance, project identity, source mesh, file paths, or authorized high-risk boundaries.

## Supervisor/Auto-Vai parser (requirements; not implemented yet)

- Identify an exact conversation/tab by stable conversation identifier **and** expected title. Never use only currently focused tab, a matching generic ChatGPT title, or just a terminal PID.
- Read **only the last completed assistant response** from the specified conversation. Parse a strictly delimited `TMAR_STATUS_V1` block and an exact final marker on its last line. Never search 65 arbitrary UI text nodes or the entire chat for marker words: the initial instruction prompt and old replies can contain them.
- Reject mismatched `CHAT`, conflicting `STATE` and marker, malformed block, partial/streaming answer, unmatched project, or missing expected new response; in such cases fail closed and report `UNVERIFIED`, do not send.
- `CONTINUE`: confirm absence of active generation/tool call, draft message, approval request, checkpoint failure or blocking alert. Allow one `vai` for one unseen message fingerprint. Before sending, bind to target conversation, verify no tab/focus change, and log timestamp, conversation id, message fingerprint and action outcome. Never retry an unverified send blindly.
- `WAIT`: no auto-message. Alert the supervisor with the blocker and minimal required user action.
- `DONE`: no auto-message. Mark goal completed only with verified outputs/acceptance evidence.
- Apply cooldown, maximum sends, bounded lifetime, manual STOP and replay protection. Two simultaneous chats need **separate per-conversation identities and state/locks**, not one global tab-bound worker.
- If read access or send access is unavailable, **do not claim** that an agent was resumed. Supervision may continue in read-only mode.

## Compatibility caveat (TMAR Auto-Vai v0.1)

The current Windows UIAutomation prototype recognizes `TMAR_GOAL_WAIT` and `TMAR_GOAL_DONE` by regex over a concatenation of up to 65 generic text elements. It is **not** a verified last-assistant-message parser and its send function has not been end-to-end tested. Because example markers may appear in the user instruction or earlier messages, **do not enable automatic sends** on the basis of this protocol alone. The parser and safe cross-chat routing must be fixed and tested with synthetic `CONTINUE`, `WAIT`, `DONE`, stale marker, partial response, wrong-chat, duplicate-send, approval and failure cases first.

## Conversation setup (prompt delivery)

Both agents should receive the same short setup prompt. For safe setup with legacy UIA, that prompt can specify the marker by concatenation (prefix `TMAR_GOAL_` + one state word), rather than including literal complete `WAIT` / `DONE` markers in the conversation's older text.

## Version and scope

v1.0 documents the reporting protocol only. It does not claim that Auto-Vai, tab navigation, supervisor delivery or recovery automation have been implemented, tested, or enabled. Any future implementation must preserve user autonomy and explicit high-risk gates.
