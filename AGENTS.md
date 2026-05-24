# hello-desktop — agents charter

Standalone **Vite + TypeScript + Electron + Tauri** desktop template. This repository is **not** part of any monorepo when cloned from GitHub — treat everything under this root as the product.

## Stack

- **Renderer:** Vite 6, TypeScript, vanilla DOM (no framework required).
- **Desktop:** Tauri 2 (primary) and Electron (legacy wrapper) share one `dist/` build.
- **Shell API:** `window.atlasShell` — frameless minimize / maximize / close (Electron preload + Tauri plug).

## CLAD layout (`src/`)

| Folder | Tier | Role |
|--------|------|------|
| `atoms/` | Atom | Named constants |
| `molecules/` | Molecule | Pure helpers (runtime detect, raise window, launch spec) |
| `sockets/` | Interface | Ports (`AtlasShellApi`, `SecondWindowHost`, …) |
| `plugs/` | Implementation | Tauri / browser adapters |
| `frames/` | Forge | Runtime host factory |
| `recipes/` | Recipe | Use cases (`openOrFocusSecondWindow`) |
| `views/` | View | DOM surfaces |
| `apps/` | App | Composition root (`bootstrapHelloDesktop`) |

Path aliases: `$atoms`, `$molecules`, `$sockets`, `$plugs`, `$frames`, `$recipes`, `$views`, `$apps` (see `tsconfig.json`).

## Defaults

- Prefer small, reviewable changes; match existing CLAD folder placement.
- Run `pnpm check` before claiming TypeScript work is done.
- Run `pnpm test` when changing molecules or recipes.
- Run `pnpm trace:audit` when trace IDs or `requirements-registry.yaml` change.

## Traceability

- Registry: `requirements-registry.yaml`
- Config: `.traceability.yaml`
- Fixture tests: `src/hello.test.ts` (scanned by `@underwoodinc/requirements-tracer`)

## Multi-window

Secondary window label: `second-window` (`atoms/secondWindow.ts`). Main window Tauri capabilities must include `allow-show`, `allow-set-focus`, and `allow-unminimize` so re-opening raises minimized popouts.
