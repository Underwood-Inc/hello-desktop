/** Mirrors `electron/preload.cjs` so frameless chrome works in Tauri without duplicating UI code. */

function guessNodeStylePlatform(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  if (/Windows/i.test(ua)) return 'win32';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'darwin';
  return 'linux';
}

function isTauriRuntime(): boolean {
  if (typeof window === 'undefined') return false;
  return '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
}

export async function installTauriAtlasShellIfPresent(): Promise<void> {
  if (!isTauriRuntime() || window.atlasShell) return;

  const { getCurrentWindow } = await import('@tauri-apps/api/window');
  const appWindow = getCurrentWindow();

  const maximizedListeners = new Set<(maximized: boolean) => void>();

  const broadcastMaximized = async (): Promise<void> => {
    try {
      const m = await appWindow.isMaximized();
      for (const cb of maximizedListeners) cb(m);
    } catch {
      /* ignore */
    }
  };

  try {
    await appWindow.onResized(() => {
      void broadcastMaximized();
    });
  } catch {
    /* resize hook optional */
  }

  void broadcastMaximized();

  const api: AtlasShellApi = {
    platform: guessNodeStylePlatform(),
    minimize: async () => {
      await appWindow.minimize();
    },
    maximizeToggle: async () => {
      if (await appWindow.isMaximized()) await appWindow.unmaximize();
      else await appWindow.maximize();
    },
    close: async () => {
      await appWindow.close();
    },
    getMaximized: () => appWindow.isMaximized(),
    setWindowTitle: async (title: string) => {
      await appWindow.setTitle(title);
    },
    subscribeMaximized: (callback: (maximized: boolean) => void) => {
      maximizedListeners.add(callback);
      void appWindow.isMaximized().then((m) => callback(m));
      return () => {
        maximizedListeners.delete(callback);
      };
    },
  };

  (window as Window & { atlasShell?: AtlasShellApi }).atlasShell = api;
}
