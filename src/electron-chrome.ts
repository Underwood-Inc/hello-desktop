import './electron-chrome.css';

const APP_TITLE = 'Hello Desktop';

function iconMinimize(): string {
  return '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><rect x="1" y="8" width="8" height="1.5" rx="0.75" fill="currentColor"/></svg>';
}

function iconMaximize(): string {
  return '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><rect x="1.5" y="1.5" width="7" height="7" rx="1" fill="none" stroke="currentColor" stroke-width="1.25"/></svg>';
}

function iconRestore(): string {
  return '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><rect x="2.5" y="2.5" width="5.5" height="5.5" rx="0.85" fill="none" stroke="currentColor" stroke-width="1.15"/><rect x="1.25" y="3.25" width="5.5" height="5.5" rx="0.85" fill="var(--atlas-bg-panel)" stroke="currentColor" stroke-width="1.15"/></svg>';
}

function iconClose(): string {
  return '<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2 L8 8 M8 2 L2 8" stroke="currentColor" stroke-width="1.35" stroke-linecap="round"/></svg>';
}

export function mountElectronChrome(): void {
  const shell = window.atlasShell;
  if (!shell) return;

  document.body.classList.add('atlas-electron-frame');

  const bar = document.createElement('header');
  bar.className = 'atlas-electron-titlebar';
  bar.setAttribute('role', 'banner');

  const lead = document.createElement('div');
  lead.className = 'atlas-electron-titlebar__lead';
  lead.setAttribute('data-tauri-drag-region', '');
  lead.textContent = document.title || APP_TITLE;

  const controls = document.createElement('div');
  controls.className = 'atlas-electron-titlebar__controls';

  const mkBtn = (label: string, className: string | undefined, html: string, action: () => void) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = ['atlas-electron-titlebar__btn', className].filter(Boolean).join(' ');
    btn.setAttribute('aria-label', label);
    btn.innerHTML = html;
    btn.addEventListener('click', () => action());
    return btn;
  };

  const btnMin = mkBtn('Minimize', undefined, iconMinimize(), () => void shell.minimize());
  const btnMax = mkBtn('Maximize', undefined, iconMaximize(), () => void shell.maximizeToggle());
  const btnClose = mkBtn('Close', 'atlas-electron-titlebar__btn--close', iconClose(), () => void shell.close());

  controls.append(btnMin, btnMax, btnClose);
  bar.append(lead, controls);

  const mount = document.querySelector('#app');
  if (mount?.parentElement === document.body) {
    document.body.insertBefore(bar, mount);
  } else {
    document.body.insertBefore(bar, document.body.firstChild);
  }

  const syncChromeTopPx = (): void => {
    const h = Math.ceil(bar.getBoundingClientRect().height);
    document.body.style.setProperty('--atlas-electron-chrome-top', `${h}px`);
  };

  requestAnimationFrame(() => {
    syncChromeTopPx();
  });
  const chromeRo = new ResizeObserver(syncChromeTopPx);
  chromeRo.observe(bar);

  const syncMaxIcon = (maximized: boolean) => {
    btnMax.setAttribute('aria-label', maximized ? 'Restore' : 'Maximize');
    btnMax.innerHTML = maximized ? iconRestore() : iconMaximize();
  };

  shell.subscribeMaximized(syncMaxIcon);
  void shell.getMaximized().then(syncMaxIcon);

  lead.addEventListener('dblclick', () => void shell.maximizeToggle());

  const titleEl = document.querySelector('title');
  const syncTitle = () => {
    lead.textContent = document.title || APP_TITLE;
  };
  syncTitle();
  if (titleEl) {
    const mo = new MutationObserver(syncTitle);
    mo.observe(titleEl, { subtree: true, characterData: true, childList: true });
  }
}
