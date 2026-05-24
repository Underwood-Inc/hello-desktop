import { SECOND_WINDOW_LABEL, SECOND_WINDOW_QUERY_PARAM } from '$atoms/secondWindow.js';
import type { SecondWindowLaunchSpec } from '$sockets/secondWindowLaunchSpec.js';

/** Build launch spec for the secondary window from the current document origin. */
export function buildSecondWindowLaunchSpec(origin: string = window.location.origin): SecondWindowLaunchSpec {
  return {
    label: SECOND_WINDOW_LABEL,
    url: `${origin}/?${SECOND_WINDOW_QUERY_PARAM}=1`,
    title: 'Second Window',
    width: 640,
    height: 480,
    decorations: false,
    onCreated: () => console.log('[hello-desktop] second window created'),
    onError: (e) => console.error('[hello-desktop] second window error:', e),
  };
}
