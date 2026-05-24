import { describe, expect, test, vi } from 'vitest';

import { raiseDesktopPopoutWindow } from './raiseDesktopPopoutWindow.js';

describe('raiseDesktopPopoutWindow', () => {
  test('[FR-002] unminimizes, shows, then focuses when minimized', async () => {
    const win = {
      isMinimized: vi.fn().mockResolvedValue(true),
      unminimize: vi.fn().mockResolvedValue(undefined),
      show: vi.fn().mockResolvedValue(undefined),
      setFocus: vi.fn().mockResolvedValue(undefined),
    };

    await raiseDesktopPopoutWindow(win);

    expect(win.unminimize).toHaveBeenCalledOnce();
    expect(win.show).toHaveBeenCalledOnce();
    expect(win.setFocus).toHaveBeenCalledOnce();
  });

  test('[FR-002] skips unminimize when not minimized', async () => {
    const win = {
      isMinimized: vi.fn().mockResolvedValue(false),
      unminimize: vi.fn(),
      show: vi.fn().mockResolvedValue(undefined),
      setFocus: vi.fn().mockResolvedValue(undefined),
    };

    await raiseDesktopPopoutWindow(win);

    expect(win.unminimize).not.toHaveBeenCalled();
    expect(win.setFocus).toHaveBeenCalledOnce();
  });
});
