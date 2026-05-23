# Hello Desktop

Minimal **Vite + TypeScript + Electron + Tauri** desktop shell starter under [Underwood-Inc](https://github.com/Underwood-Inc).

Also serves as the **end-to-end test adopter** for [`requirements-tracer-action`](https://github.com/Underwood-Inc/requirements-tracer-action) and [`@underwoodinc/requirements-tracer`](https://www.npmjs.com/package/@underwoodinc/requirements-tracer).

## Traceability

| File | Purpose |
|------|---------|
| `requirements-registry.yaml` | Requirement IDs (`FR-001`, …) |
| `.traceability.yaml` | Tracer config (globs, kinds) |
| `src/hello.test.ts` | Valid fixture tests |

**CI:** `.github/workflows/traceability.yml` runs the published Action on every PR.

**Test PR:** branch `test/traceability-action-audit` adds intentional audit errors and warnings — use it to verify annotations, PR comments, and the HTML artifact.

## Commands

| Command | Purpose |
|--------|---------|
| `pnpm dev` | Vite dev server |
| `pnpm tauri:dev` | Tauri + Vite dev |
| `pnpm build:electron` | Production static build → `dist/` |
| `pnpm check` | Typecheck |

Requires Node 22+ and pnpm 10+.

## License

MIT — Underwood-Inc
