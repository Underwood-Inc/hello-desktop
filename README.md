# Hello Desktop

Minimal **Vite + TypeScript + Electron + Tauri** desktop shell starter under [Underwood-Inc](https://github.com/Underwood-Inc).

Also serves as the **end-to-end test adopter** for [`requirements-tracer-action`](https://github.com/Underwood-Inc/requirements-tracer-action) and [`@underwoodinc/requirements-tracer`](https://www.npmjs.com/package/@underwoodinc/requirements-tracer).

## Traceability

| File | Purpose |
|------|---------|
| `requirements-registry.yaml` | Requirement IDs (`FR-001`, …) |
| `.traceability.yaml` | Tracer config (globs, kinds) |
| `src/hello.test.ts` | Valid fixture tests |

**Local CLI** (same as Mappy — `@underwoodinc/requirements-tracer` via `pnpm`):

```bash
pnpm install
pnpm trace:audit    # exit 1 on errors; use before opening a PR
pnpm trace:report   # writes traceability-report/index.html + summary.json
pnpm trace:scan     # JSON scan only
```

**CI:** `.github/workflows/traceability.yml` runs the published Action on every PR (artifact upload + PR comment). Use local scripts while developing; CI validates the Action path adopters wire in GitHub.

**Test PR:** branch `test/traceability-action-audit` adds intentional audit errors and warnings — use it to verify annotations, PR comments, and the HTML artifact.

## Commands

| Command | Purpose |
|--------|---------|
| `pnpm dev` | Vite dev server |
| `pnpm tauri:dev` | Tauri + Vite dev |
| `pnpm build:electron` | Production static build → `dist/` |
| `pnpm check` | Typecheck |
| `pnpm trace:audit` | Audit test trace IDs vs registry |
| `pnpm trace:report` | Generate HTML traceability report |
| `pnpm trace:scan` | Scan tests (JSON output) |

Requires Node 22+ and pnpm 10+.

## License

MIT — Underwood-Inc
