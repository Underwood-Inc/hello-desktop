export type MountHelloMainCardOptions = {
  isSecondWindow: boolean;
  onOpenSecondWindow: () => void;
};

/** View: primary or secondary hello card mounted into `#app`. */
export function mountHelloMainCard(mount: HTMLElement, options: MountHelloMainCardOptions): void {
  const card = document.createElement('div');
  card.className = 'hello';

  if (options.isSecondWindow) {
    card.innerHTML = `<h1>Second Window</h1><p>Multi-window works in Tauri.</p>`;
  } else {
    card.innerHTML = `
      <h1>Hello Desktop</h1>
      <p>
        Vite + TypeScript desktop shell with frameless chrome: Electron preload and Tauri
        both expose <code>window.atlasShell</code> for window controls.
      </p>
      <p style="margin-top:1rem;font-size:0.9rem;opacity:0.85">
        Run <code>pnpm dev</code> (web), <code>pnpm tauri:dev</code> (Tauri), or
        <code>pnpm electron</code> after <code>pnpm build:electron</code>.
      </p>
      <button id="open-second" type="button" style="margin-top:1.5rem;padding:0.5rem 1.25rem;cursor:pointer;font-size:1rem;">
        Open Second Window
      </button>
    `;
  }

  mount.appendChild(card);

  if (!options.isSecondWindow) {
    document.getElementById('open-second')?.addEventListener('click', options.onOpenSecondWindow);
  }
}
