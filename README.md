# blackroad-os-pack-legal

Legal & Policy Pack scaffolding for BlackRoad OS. This pack provides structured templates, workflows, and issue-spotting helpers to support legal operations teams. **It is not legal advice and does not form an attorney–client relationship.**

## What this pack offers
- Agent stubs for contract drafting support, policy stewardship, and compliance flagging.
- Workflows for contract reviews, DPA risk assessments, and policy updates.
- Templates for MSAs, privacy policies, terms of service, and DPA checklists.
- Documentation emphasizing human counsel oversight.

## Strong disclaimers
- This pack is not a law firm and does not provide legal advice.
- Outputs are drafts, outlines, and issue-spotting prompts only.
- Always engage licensed counsel for final language, compliance determinations, and enforceability.

## BlackRoad OS fit
- Works with **blackroad-os-docs** for hosting policy and terms artifacts.
- Aligns with **blackroad-os-archive** for managing signed agreements and related assets.
- Integrates with **blackroad-os-api** to run workflows via operators or services.

## Registering the pack
1. Publish or reference `pack.yaml` in your Pack Index.
2. Ensure dependent packs (`blackroad-os-core`, `blackroad-os-docs`) are available.
3. Enable the agents in your Agent Catalog using the accompanying `.agent.yaml` files.

## Running workflows
- **Contract review:**
  ```ts
  await operatorClient.startWorkflow("legal_contract_review", {
    draft_contract_text,
  });
  ```
- **DPA risk assessment:** provide the DPA checklist data to `legal_dpa_risk_assessment`.
- **Policy update:** supply old and new policy structures to `legal_policy_update` to generate change summaries and communication plans.

## Testing
- Install dependencies and run tests:
  - `npm install` then `npm test`
  - `npm run lint:schemas` and `npm run lint:workflows`
  - `pip install -r requirements.txt` then `pytest`

## Sample outputs
- **Contract outline (snippet):**
  ```json
  {
    "parties": {"customerName": "Example Corp", "providerName": "Service Co"},
    "sections": ["Scope of Services", "Term & Termination", "Fees & Payment"],
    "counsel_questions": ["Are exclusivity terms acceptable for the business context?"]
  }
  ```
- **Policy change summary (snippet):**
  ```json
  {"added": ["retention"], "modified": [{"field": "data", "from": "collected", "to": "updated"}]}
  ```

Always route final decisions and drafting to qualified counsel.
# BlackRoad OS · Legal Pack

LegalPack-Gen-0 scaffolds contracts, compliance policies, helper agents, and workflow templates for BlackRoad OS deployments.

## Quickstart

```bash
pnpm install
pnpm br-legal list
pnpm br-legal render nda -v party_a="BlackRoad OS, Inc." -v party_b="Client" -v date="2025-11-24"
```

Render workflow templates via Liquid and Handlebars-style variables:

```bash
pnpm ts-node lib/renderWorkflow.ts workflows/contract-signature.yaml.hbs > .github/workflows/sign.yml
```

## Features

- Contract templates with Liquid variables under `/contracts`
- Policy documents in `/policies` with MDX front matter
- TypeScript agents to render contracts, diff versions, and lint policies
- GitHub Actions workflow templates to automate signatures and compliance audits
- CLI `br-legal` for listing templates, rendering, diffing, and linting

## Directory Layout

- `contracts/` — NDA, MSA, and license templates
- `policies/` — privacy, terms of service, and export compliance
- `agents/` — render, diff, and lint helpers
- `lib/` — Liquid renderer and metadata schema
- `workflows/` — GitHub Actions templates with required secrets and reviewers
- `src/cli.ts` — CLI entrypoint
- `.github/workflows/ci.yml` — linting and unit test automation

## Development

- `pnpm lint` to run markdownlint, Prettier, and ESLint
- `pnpm format` to auto-format
- `pnpm test` for unit tests (placeholder)
- `pnpm postbuild` writes `public/sig.beacon.json` with the current timestamp

## Roadmap

- TODO(legal-pack-next): add e-signature webhook, AI clause recommender, and USPTO filing agent integrations.
