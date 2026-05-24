/** Port: minimal surface for raising an existing desktop popout window. */
export interface DesktopPopoutWindowHandle {
  isMinimized(): Promise<boolean>;
  unminimize(): Promise<void>;
  show(): Promise<void>;
  setFocus(): Promise<void>;
}
