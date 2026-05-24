/** Map `navigator.userAgent` to a Node-style platform string for shell metadata. */
export function guessNodeStylePlatform(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent || '';
  if (/Windows/i.test(ua)) return 'win32';
  if (/Macintosh|Mac OS X/i.test(ua)) return 'darwin';
  return 'linux';
}
