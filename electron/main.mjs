/**
 * Minimal Electron shell: `pnpm build:electron` then load `dist/index.html` (`vite build --base ./`).
 */
import { BrowserWindow, Menu, app, ipcMain } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

let shellIpcReady = false;

function ensureAtlasShellIpc() {
  if (shellIpcReady) return;
  shellIpcReady = true;

  ipcMain.handle('atlas-shell:minimize', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.minimize();
  });

  ipcMain.handle('atlas-shell:maximize-toggle', (event) => {
    const w = BrowserWindow.fromWebContents(event.sender);
    if (!w) return;
    if (w.isMaximized()) w.unmaximize();
    else w.maximize();
  });

  ipcMain.handle('atlas-shell:close', (event) => {
    BrowserWindow.fromWebContents(event.sender)?.close();
  });

  ipcMain.handle('atlas-shell:is-maximized', (event) => {
    return BrowserWindow.fromWebContents(event.sender)?.isMaximized() ?? false;
  });

  ipcMain.handle('atlas-shell:set-window-title', (event, title) => {
    const w = BrowserWindow.fromWebContents(event.sender);
    if (!w || typeof title !== 'string') return;
    const t = title.trim().slice(0, 512);
    if (!t) return;
    w.setTitle(t);
  });
}

function createWindow() {
  ensureAtlasShellIpc();

  const iconPath = path.join(__dirname, 'icons', 'icon.png');

  const win = new BrowserWindow({
    width: 960,
    height: 640,
    minWidth: 640,
    minHeight: 480,
    title: 'Hello Desktop',
    frame: false,
    ...(fs.existsSync(iconPath) ? { icon: iconPath } : {}),
    backgroundColor: '#1a1b26',
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.cjs'),
    },
  });

  const broadcastMaximized = () => {
    win.webContents.send('atlas-shell:maximized', win.isMaximized());
  };

  win.on('maximize', broadcastMaximized);
  win.on('unmaximize', broadcastMaximized);

  win.webContents.once('did-finish-load', broadcastMaximized);

  void win.loadFile(path.join(distDir, 'index.html'));
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
