import { raiseDesktopPopoutWindow } from '$molecules/raiseDesktopPopoutWindow.js';
import type { SecondWindowHost } from '$sockets/secondWindowHost.js';
import type { SecondWindowLaunchSpec } from '$sockets/secondWindowLaunchSpec.js';

export type OpenOrFocusSecondWindowResult = 'created' | 'focused';

/** Open the secondary window, or raise and focus it when one already exists. */
export async function openOrFocusSecondWindow(
  host: SecondWindowHost,
  spec: SecondWindowLaunchSpec,
): Promise<OpenOrFocusSecondWindowResult> {
  const existing = await host.getByLabel(spec.label);
  if (existing) {
    await raiseDesktopPopoutWindow(existing);
    return 'focused';
  }

  await host.create(spec);
  return 'created';
}
