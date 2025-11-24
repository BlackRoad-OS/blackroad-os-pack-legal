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
