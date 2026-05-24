# Hello Desktop

[![CI](https://github.com/Underwood-Inc/hello-desktop/actions/workflows/ci.yml/badge.svg)](https://github.com/Underwood-Inc/hello-desktop/actions/workflows/ci.yml)

**GitHub template** for a minimal **Vite + TypeScript + Electron + Tauri** desktop app with frameless window chrome, CLAD-shaped source layout, multi-window support, and optional requirements traceability.

> **Use this template:** GitHub → **Use this template** → **Create a new repository**.  
> After publishing your copy, enable **Settings → General → Template repository** if you want others to fork from yours.

## Features

- One static `dist/` build serves **Tauri 2** (primary) and **Electron** (legacy wrapper).
- Frameless title bar via `window.atlasShell` (minimize / maximize / close).
- **Multi-window:** open-or-focus secondary window with unminimize → show → raise.
- **[CLAD](https://github.com/Underwood-Inc/hello-desktop/blob/main/AGENTS.md)** folder layout: atoms → molecules → sockets → plugs → recipes → views → apps.
- Optional **requirements traceability** via [`@underwoodinc/requirements-tracer`](https://www.npmjs.com/package/@underwoodinc/requirements-tracer) and a ready CI workflow.

## Prerequisites

- **Node.js 22+** (see `.nvmrc`)
- **pnpm 10+**
- **Tauri dev:** [platform deps](https://v2.tauri.app/start/prerequisites/) + Rust toolchain
- **Electron dev:** no extra runtime beyond Node

## Quick start

```bash
pnpm install
pnpm dev              # Vite only (browser)
pnpm tauri:dev        # Tauri + Vite (recommended)
pnpm build:electron   # production dist/
pnpm electron         # Electron loads dist/ (run build:electron first)
pnpm check            # TypeScript
pnpm test             # Vitest (molecules + recipes)
```

## Project layout

```
src/
  atoms/          constants (window labels, query params)
  molecules/      pure helpers (runtime detect, raise popout, …)
  sockets/        ports / interfaces
  plugs/          Tauri & browser adapters
  frames/         host factories
  recipes/        use cases (openOrFocusSecondWindow)
  views/          DOM (titlebar chrome, main card)
  apps/           composition root (bootstrapHelloDesktop)
electron/         legacy Electron main + preload
src-tauri/        Tauri 2 shell (capabilities, icons, bundle)
```

See [AGENTS.md](./AGENTS.md) for assistant and contributor conventions.

## After creating from template

Rename the app in these places (search for `hello-desktop` / `Hello Desktop` / `com.example.hello-desktop`):

| Location | Fields |
|----------|--------|
| `package.json` | `name`, `build.appId`, `build.productName` |
| `src-tauri/tauri.conf.json` | `productName`, `identifier`, window `title`, bundle metadata |
| `src-tauri/Cargo.toml` | `name`, `description`, `authors` |
| `index.html` | `<title>` |
| `src/views/electronChrome.ts` | `APP_TITLE` |
| `src/views/helloMainCard.ts` | visible copy (optional) |
| `electron/main.mjs` | window `title` if you add one |
| `requirements-registry.yaml` | `owner` field on requirements |

Replace `electron/icons/icon.png` and run `pnpm tauri:icon` to regenerate Tauri icon sets.

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Vite dev server (port 1420) |
| `pnpm tauri:dev` | Tauri desktop dev + HMR |
| `pnpm build:electron` | Production static build → `dist/` |
| `pnpm electron` | Electron shell (after `build:electron`) |
| `pnpm tauri:dist` | Tauri release bundles |
| `pnpm electron:dist` | Electron installer via electron-builder |
| `pnpm check` | `tsc --noEmit` |
| `pnpm test` | Vitest unit tests |
| `pnpm trace:audit` | Audit test trace IDs vs registry |
| `pnpm trace:report` | HTML traceability report |
| `pnpm trace:scan` | JSON scan only |

## Traceability (optional)

| File | Purpose |
|------|---------|
| `requirements-registry.yaml` | Requirement IDs (`FR-001`, …) |
| `.traceability.yaml` | Tracer config |
| `src/hello.test.ts` | Fixture tests for CI scan |

```bash
pnpm trace:audit    # exit 1 on errors — run before opening a PR
pnpm trace:report   # traceability-report/index.html
```

CI: `.github/workflows/traceability.yml` runs the published [requirements-tracer-action](https://github.com/Underwood-Inc/requirements-tracer-action) on pull requests.

## CI

- **`.github/workflows/ci.yml`** — typecheck, unit tests, production Vite build.
- **`.github/workflows/traceability.yml`** — requirements trace audit on PRs.

## License

MIT — see [LICENSE](./LICENSE).
