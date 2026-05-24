import type { AtlasShellApi } from '$sockets/atlasShell.js';
import { guessNodeStylePlatform } from '$molecules/guessNodeStylePlatform.js';
import { isTauriRuntime } from '$molecules/detectDesktopRuntime.js';

/** Tauri adapter: bind {@link AtlasShellApi} on `window.atlasShell` when running in Tauri. */
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
