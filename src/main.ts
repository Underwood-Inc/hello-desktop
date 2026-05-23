import { mountElectronChrome } from './electron-chrome.js';
import { installTauriAtlasShellIfPresent } from './tauri-atlas-shell.js';
import './style.css';

function isTauri(): boolean {
  return typeof window !== 'undefined' && ('__TAURI_INTERNALS__' in window || '__TAURI__' in window);
}

async function openSecondWindow(): Promise<void> {
  if (!isTauri()) {
    window.open(window.location.origin + '/?secondWindow=1', '_blank', 'width=640,height=480');
    return;
  }
  const { WebviewWindow } = await import('@tauri-apps/api/webviewWindow');
  const existing = await WebviewWindow.getByLabel('second-window');
  if (existing) {
    await existing.setFocus();
    return;
  }
  const win = new WebviewWindow('second-window', {
    url: window.location.origin + '/?secondWindow=1',
    title: 'Second Window',
    width: 640,
    height: 480,
    decorations: false,
  });
  win.once('tauri://created', () => console.log('[hello-desktop] second window created'));
  win.once('tauri://error', (e) => console.error('[hello-desktop] second window error:', e));
}

void (async () => {
  await installTauriAtlasShellIfPresent();
  mountElectronChrome();

  const mount = document.querySelector('#app');
  if (!mount) return;

  const isSecond = new URLSearchParams(window.location.search).has('secondWindow');

  const card = document.createElement('div');
  card.className = 'hello';

  if (isSecond) {
    card.innerHTML = `<h1>Second Window</h1><p>Multi-window works in Tauri.</p>`;
  } else {
    card.innerHTML = `
      <h1>Hello Desktop</h1>
      <p>
        Vite + TypeScript UI with the same <strong>frameless chrome</strong> pattern as
        <code>apps/mappy</code>: Electron preload and Tauri <code>@tauri-apps/api</code>
        both expose <code>window.atlasShell</code>.
      </p>
      <p style="margin-top:1rem;font-size:0.9rem;opacity:0.85">
        Run <code>pnpm dev</code> (web), <code>pnpm tauri:dev</code> (Tauri), or
        <code>pnpm electron</code> after <code>pnpm build:electron</code>.
      </p>
      <button id="open-second" style="margin-top:1.5rem;padding:0.5rem 1.25rem;cursor:pointer;font-size:1rem;">
        Open Second Window
      </button>
    `;
  }

  mount.appendChild(card);

  if (!isSecond) {
    document.getElementById('open-second')?.addEventListener('click', () => void openSecondWindow());
  }
})();
