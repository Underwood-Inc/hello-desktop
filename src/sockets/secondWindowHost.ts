import type { DesktopPopoutWindowHandle } from './desktopPopoutWindow.js';
import type { SecondWindowLaunchSpec } from './secondWindowLaunchSpec.js';

/** Port: platform-agnostic host for opening or resolving the secondary window. */
export interface SecondWindowHost {
  getByLabel(label: string): Promise<DesktopPopoutWindowHandle | null>;
  create(spec: SecondWindowLaunchSpec): Promise<void>;
}
