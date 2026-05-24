/** Launch parameters for the hello-desktop secondary window. */
export interface SecondWindowLaunchSpec {
  label: string;
  url: string;
  title: string;
  width: number;
  height: number;
  decorations?: boolean;
  onCreated?: () => void;
  onError?: (error: unknown) => void;
}
