/// <reference types="vite/client" />

declare global {
  interface AtlasShellApi {
    readonly platform: string;
    minimize(): Promise<void>;
    maximizeToggle(): Promise<void>;
    close(): Promise<void>;
    getMaximized(): Promise<boolean>;
    setWindowTitle(title: string): Promise<void>;
    subscribeMaximized(callback: (maximized: boolean) => void): () => void;
  }

  interface Window {
    readonly atlasShell?: AtlasShellApi;
  }
}

export {};
