import { SECOND_WINDOW_QUERY_PARAM } from '$atoms/secondWindow.js';

/** True when this page was opened as the secondary hello-desktop window. */
export function isSecondWindowMode(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has(SECOND_WINDOW_QUERY_PARAM);
}
