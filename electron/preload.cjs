'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('atlasShell', {
  platform: process.platform,
  minimize: () => ipcRenderer.invoke('atlas-shell:minimize'),
  maximizeToggle: () => ipcRenderer.invoke('atlas-shell:maximize-toggle'),
  close: () => ipcRenderer.invoke('atlas-shell:close'),
  getMaximized: () => ipcRenderer.invoke('atlas-shell:is-maximized'),
  setWindowTitle: (title) => ipcRenderer.invoke('atlas-shell:set-window-title', title),
  subscribeMaximized: (callback) => {
    const listener = (_event, value) => {
      callback(Boolean(value));
    };
    ipcRenderer.on('atlas-shell:maximized', listener);
    return () => ipcRenderer.removeListener('atlas-shell:maximized', listener);
  },
});
