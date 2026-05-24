/** Port: frameless window controls exposed by Electron preload or Tauri shell plug. */
export interface AtlasShellApi {
  readonly platform: string;
  minimize(): Promise<void>;
  maximizeToggle(): Promise<void>;
  close(): Promise<void>;
  getMaximized(): Promise<boolean>;
  setWindowTitle(title: string): Promise<void>;
  subscribeMaximized(callback: (maximized: boolean) => void): () => void;
}

declare global {
  interface Window {
    readonly atlasShell?: AtlasShellApi;
  }
}

export {};
