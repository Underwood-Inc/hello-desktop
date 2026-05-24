import type { DesktopPopoutWindowHandle } from '$sockets/desktopPopoutWindow.js';
import type { SecondWindowHost } from '$sockets/secondWindowHost.js';
import type { SecondWindowLaunchSpec } from '$sockets/secondWindowLaunchSpec.js';

/** Browser fallback: opens via `window.open`; cannot refocus an existing tab reliably. */
export function createBrowserSecondWindowHost(): SecondWindowHost {
  return {
    async getByLabel(_label: string): Promise<DesktopPopoutWindowHandle | null> {
      return null;
    },

    async create(spec: SecondWindowLaunchSpec): Promise<void> {
      const features = `width=${spec.width},height=${spec.height}`;
      window.open(spec.url, spec.label, features);
      spec.onCreated?.();
    },
  };
}
