import { detectDesktopRuntime } from '$molecules/detectDesktopRuntime.js';
import type { SecondWindowHost } from '$sockets/secondWindowHost.js';
import { createBrowserSecondWindowHost } from '$plugs/browser/createBrowserSecondWindowHost.js';
import { createTauriSecondWindowHost } from '$plugs/tauri/createTauriSecondWindowHost.js';

export type CreateSecondWindowHostOptions = {
  /** Force a runtime instead of auto-detecting (useful in tests). */
  runtime?: 'tauri' | 'browser';
};

/** Composition root: pick the secondary-window host for the active runtime. */
export function createSecondWindowHost(
  options?: CreateSecondWindowHostOptions,
): SecondWindowHost {
  const runtime = options?.runtime ?? detectDesktopRuntime();
  if (runtime === 'tauri') return createTauriSecondWindowHost();
  return createBrowserSecondWindowHost();
}
