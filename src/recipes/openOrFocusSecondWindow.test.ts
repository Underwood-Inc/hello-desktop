import { describe, expect, test, vi } from 'vitest';

import type { SecondWindowHost } from '$sockets/secondWindowHost.js';

import { openOrFocusSecondWindow } from './openOrFocusSecondWindow.js';

describe('openOrFocusSecondWindow', () => {
  test('[FR-002] creates when no window exists', async () => {
    const create = vi.fn().mockResolvedValue(undefined);
    const host: SecondWindowHost = {
      getByLabel: vi.fn().mockResolvedValue(null),
      create,
    };

    const result = await openOrFocusSecondWindow(host, {
      label: 'second-window',
      url: '/?secondWindow=1',
      title: 'Second',
      width: 640,
      height: 480,
    });

    expect(result).toBe('created');
    expect(create).toHaveBeenCalledOnce();
  });

  test('[FR-002] raises when window already exists', async () => {
    const handle = {
      isMinimized: vi.fn().mockResolvedValue(true),
      unminimize: vi.fn().mockResolvedValue(undefined),
      show: vi.fn().mockResolvedValue(undefined),
      setFocus: vi.fn().mockResolvedValue(undefined),
    };
    const host: SecondWindowHost = {
      getByLabel: vi.fn().mockResolvedValue(handle),
      create: vi.fn(),
    };

    const result = await openOrFocusSecondWindow(host, {
      label: 'second-window',
      url: '/?secondWindow=1',
      title: 'Second',
      width: 640,
      height: 480,
    });

    expect(result).toBe('focused');
    expect(handle.unminimize).toHaveBeenCalledOnce();
    expect(handle.setFocus).toHaveBeenCalledOnce();
  });
});
