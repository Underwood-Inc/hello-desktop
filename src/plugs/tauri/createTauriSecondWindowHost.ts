import type { DesktopPopoutWindowHandle } from '$sockets/desktopPopoutWindow.js';
import type { SecondWindowHost } from '$sockets/secondWindowHost.js';
import type { SecondWindowLaunchSpec } from '$sockets/secondWindowLaunchSpec.js';

/** Tauri {@link WebviewWindow} adapter for {@link SecondWindowHost}. */
export function createTauriSecondWindowHost(): SecondWindowHost {
  return {
    async getByLabel(label: string): Promise<DesktopPopoutWindowHandle | null> {
      const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
      return WebviewWindow.getByLabel(label);
    },

    async create(spec: SecondWindowLaunchSpec): Promise<void> {
      const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
      const win = new WebviewWindow(spec.label, {
        url: spec.url,
        title: spec.title,
        width: spec.width,
        height: spec.height,
        decorations: spec.decorations ?? false,
      });
      if (spec.onCreated) win.once('tauri://created', spec.onCreated);
      if (spec.onError) win.once('tauri://error', spec.onError);
    },
  };
}
