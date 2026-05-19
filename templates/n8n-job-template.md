# Template: n8n Job

_Use this template to define an n8n workflow job that interacts with the dev-method ecosystem._

---

## Routing

- **Mode:** _[PLAN | CODE | DEBUG — for the implementer building this job]_
- **Preferred implementer:** _[who will build/configure this job]_
- **Fallback implementer:** _[if applicable]_
- **Preferred model:** lightweight / standard/medium / stronger
- **Preferred effort:** low / medium / high
- **Reason:** _[one short explanation]_

---

## Purpose

_[What this job does in one sentence.]_

## Trigger

_[Cron schedule | Webhook | Manual | Event — describe trigger conditions]_

## Inputs

_[List all input data the job reads: files, environment variables, webhook payload fields, etc.]_

## Outputs

_[List all output data the job produces: files written, messages sent, API calls made, state changes.]_

## Idempotency key

_[What field or combination of fields makes this job run unique? Running twice with the same key must be safe.]_

## Duplicate handling

_[What happens if the job runs again for an already-processed event? Skip / log / error?]_

## Failure behavior

_[What happens on error? Retry count, retry delay, dead-letter behavior, notification.]_

## Human gate behavior

_[Does this job trigger a human gate? If yes: what condition, what Decision Packet content, what channel, and what happens if the human rejects?]_

## Secrets policy

- No secrets are stored in workflow node parameters as plain text.
- Use n8n credential objects or environment variables.
- Do not log secret values.

## Logging / evidence

_[What does this job log? Where are logs stored? Is a GitHub commit or evidence file produced?]_
