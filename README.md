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
# 💼⚖️ blackroad-os-pack-legal

**Legal & Compliance Pack** – workflows, checklists, and tooling for legal/compliance flows inside BlackRoad OS.

---

## 🎯 Mission

- Provide **legal + compliance superpowers** as a modular Pack in BlackRoad OS.
- Encode repeatable legal workflows (reviews, approvals, archiving) that plug into core, infra, and agents.
- Keep all legal-ish stuff structured, traceable, and automation-friendly (but never DIY law).

---

## 🏗️ What This Pack Owns ✅

### ⚖️ Legal/Compliance Workflows
- Issue/PR labeling rules for "needs legal review", "comms sign-off", etc. 🏷️
- Flows for policy updates, terms changes, disclaimers, and notices 📜
- Approval steps & state machines for sensitive changes ☑️➡️✅

### 📓 Templates & Checklists
- Templates for policies (privacy, terms, usage, security overview) 📄
- Checklists for launching new features/products in regulated contexts ✅
- Intake forms for legal review requests (who, what, risk level, deadline) 🧾

### 🤖 Agent Hooks
- Definitions for "legal support" agents (triage helper, checklist enforcer, archive pinger) 🤖
- Rules they follow: what they can **suggest** vs what must be **human-reviewed** 🧍‍♀️
- Outputs they generate (summaries, risk flags, routing suggestions) 📡

### 📊 Integration Glue
How legal workflows show up in:
- `blackroad-os-prism-console` as "legal/compliance views" 🕹️
- `blackroad-os-archive` for audit logs & final artifacts 🧾
- `blackroad-os-operator` jobs (e.g., "collect all artifacts for this launch") ⚙️

---

## 🚫 What This Pack Does NOT Own

| Domain | Owner Repo |
|--------|-----------|
| 🚫 Infra-as-code | `blackroad-os-infra` ☁️ |
| 🚫 Core app engine | `blackroad-os-core` 🧠 |
| 🚫 Gateway rules | `blackroad-os-api-gateway` 🌉 |
| 🚫 Brand visuals | `blackroad-os-brand` 🎨 |
| 🚫 General docs/handbook | `blackroad-os-docs` / `-home` 📚🏠 |
| 🚫 Full-blown legal advice text for customers | External docs/contracts 🚫 |

---

## 📂 Repository Structure

```
blackroad-os-pack-legal/
├── README.md                    # This file
├── workflows/                   # Legal workflow definitions
│   ├── labeling-rules.yaml      # Issue/PR labeling rules
│   ├── approval-flow.yaml       # Approval state machine
│   └── policy-update-flow.yaml  # Policy change workflow
├── templates/
│   ├── policies/                # Policy templates
│   │   ├── privacy-policy.md
│   │   ├── terms-of-service.md
│   │   ├── acceptable-use.md
│   │   └── security-overview.md
│   ├── checklists/              # Compliance checklists
│   │   ├── feature-launch.md
│   │   └── regulatory-context.md
│   └── forms/                   # Intake forms
│       └── legal-review-request.md
├── agents/                      # Agent definitions
│   ├── triage-helper.yaml
│   ├── checklist-enforcer.yaml
│   └── archive-pinger.yaml
├── integrations/                # Integration configs
│   ├── prism-console.yaml
│   ├── archive.yaml
│   └── operator.yaml
└── tests/                       # Test files
    ├── workflow-states.test.yaml
    └── schema-validation.test.yaml
```

---

## 🧪 Testing / Safety

### For Automation Logic / State Machines
- ✅ Tests for each state transition (requested → in review → approved/rejected → archived) 🔁
- ✅ Tests that ensure required approvals exist before "complete" ✅
- ✅ Tests that agents can't auto-complete flows that require human sign-off 🚫🤖

### For Templates & Config
- 🧪 Validate schema (fields present, types correct)
- 🧪 Ensure links/IDs refer to real repos/workflows where possible

---

## 🔐 Compliance Guardrails (IMPORTANT)

This Pack **supports** legal/compliance work; it does **not replace lawyers**:

- ⚠️ Clearly mark any content that is *example* only vs actual policy text.
- 🧾 Ensure key outputs flow to `blackroad-os-archive` for auditability.
- 🔑 Do not store real privileged legal memos; store *references* and metadata.

### High-Risk Flow Markers

Any flow that touches:
- 💰 Finance, trading, custody
- 🪪 Identity, KYC, personal data
- ⚖️ Regulatory filings or attestations

**MUST** be marked clearly, e.g.:
```
// HIGH-RISK LEGAL FLOW – HUMAN APPROVAL REQUIRED
```

---

## 📏 Design Principles

`blackroad-os-pack-legal` = **legal/compliance layer as a product Pack**:
- 💼 It plugs into OS like any other Pack (Finance, Education, etc.).
- 🧭 It defines workflows, templates, configs – not infrastructure.

Each workflow or template should answer:
1. 1️⃣ **When is this used?** (launch, marketing, policy change, incident, etc.)
2. 2️⃣ **Who must be involved?** (roles/teams, not specific names)
3. 3️⃣ **What must be true before it's considered "done" and safe?**

---

## 🧬 Emoji Legend

| Emoji | Meaning |
|-------|---------|
| 💼 | Pack / vertical product |
| ⚖️ | Legal / compliance |
| 📜 | Policies / terms |
| 🧾 | Audit artifacts |
| 🏷️ | Labels / states |
| 🤖 | Helper agents |
| 🚫 | High-risk guardrails |

---

## 🎯 Success Criteria

If a new operator/agent responsible for legal/compliance lands here, they should be able to:

1. 1️⃣ See the standard legal/compliance workflows wired into BlackRoad OS.
2. 2️⃣ Understand which flows require **mandatory human approval**.
3. 3️⃣ Know how artifacts end up in archive + dashboards for audit and review.

---

## 🚀 Getting Started

1. Review the [workflows/](./workflows/) directory for available legal workflow definitions
2. Check [templates/](./templates/) for policy and checklist templates
3. See [agents/](./agents/) for agent hook configurations
4. Review [integrations/](./integrations/) for how this pack connects to other BlackRoad OS components

---

## 📄 License

Part of BlackRoad OS. See repository root for license information.
