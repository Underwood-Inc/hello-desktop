import type { DesktopPopoutWindowHandle } from '$sockets/desktopPopoutWindow.js';

/**
 * Raise an existing popout above sibling windows and give it keyboard focus.
 * Unminimizes when minimized, shows when hidden, then focuses.
 */
export async function raiseDesktopPopoutWindow(
  handle: DesktopPopoutWindowHandle,
): Promise<void> {
  try {
    if (await handle.isMinimized()) {
      await handle.unminimize();
    }
  } catch {
    /* unminimize may be unavailable on some platforms */
  }

  try {
    await handle.show();
  } catch {
    /* show may be unavailable when already visible */
  }

  await handle.setFocus();
}
