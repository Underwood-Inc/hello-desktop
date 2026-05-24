import { buildSecondWindowLaunchSpec } from '$molecules/buildSecondWindowLaunchSpec.js';
import { isSecondWindowMode } from '$molecules/secondWindowMode.js';
import { installTauriAtlasShellIfPresent } from '$plugs/tauri/installTauriAtlasShell.js';
import { createSecondWindowHost } from '$frames/createSecondWindowHost.js';
import { openOrFocusSecondWindow } from '$recipes/openOrFocusSecondWindow.js';
import { mountElectronChrome } from '$views/electronChrome.js';
import { mountHelloMainCard } from '$views/helloMainCard.js';

/** App composition root: wire shell plugs, views, and secondary-window recipe. */
export async function bootstrapHelloDesktop(): Promise<void> {
  await installTauriAtlasShellIfPresent();
  mountElectronChrome();

  const mount = document.querySelector('#app');
  if (!(mount instanceof HTMLElement)) return;

  const host = createSecondWindowHost();
  const spec = buildSecondWindowLaunchSpec();

  mountHelloMainCard(mount, {
    isSecondWindow: isSecondWindowMode(),
    onOpenSecondWindow: () => {
      void openOrFocusSecondWindow(host, spec);
    },
  });
}
