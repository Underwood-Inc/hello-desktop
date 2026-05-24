export type DesktopRuntime = 'tauri' | 'browser';

export function isTauriRuntime(): boolean {
  return (
    typeof window !== 'undefined' &&
    ('__TAURI_INTERNALS__' in window || '__TAURI__' in window)
  );
}

export function detectDesktopRuntime(): DesktopRuntime {
  return isTauriRuntime() ? 'tauri' : 'browser';
}
