// Types for the <css-doodle> element's JS API, from the reference pages

/** One warning from a render: `index` is a character offset, `pos` a zero-based [column, line]. */
export interface DoodleWarning {
  message: string;
  index?: number;
  pos?: [number, number];
}

export interface ExportOptions {
  /** Whole-number multiplier on the rendered size; 1 uses the device pixel ratio. */
  scale?: number;
  /** Also render the PNG: the result gets `blob` and `source`. */
  detail?: boolean;
  /** Render the PNG and trigger a download. */
  download?: boolean;
  /** File name for the download, without `.png`. */
  name?: string;
}

export interface ExportResult {
  width: number;
  height: number;
  svg: string;
  /** The PNG, with `detail` or `download`. */
  blob?: Blob;
  /** The SVG as a data URL, with `detail` or `download`. */
  source?: string;
}

/** A `<css-doodle>` element (css-doodle.com/reference § JS APIs § Element). */
export interface CSSDoodle extends HTMLElement {
  /** Re-renders, optionally with new code; a new seed unless one is fixed. */
  update(code?: string): void;
  export(options?: ExportOptions): Promise<ExportResult>;
  pause(): void;
  resume(): void;
  /** Time of every animation in the doodle, in ms. */
  currentTime: number;
  /** Starts re-rendering every `interval` (such as '2s'); see autoUpdate(). */
  autoUpdate(interval?: string | number): void;
  cancelAutoUpdate(): void;
  /** Reading returns the grid in use; setting writes the grid attribute. */
  get grid(): { x: number; y: number; z: number; count: number; ratio: number };
  set grid(value: string);
  /** The seed of the last render, as a string. Setting writes the seed attribute. */
  get seed(): string | undefined;
  set seed(value: string | number);
  use: string | null;
  readonly diagnostics: DoodleWarning[];
}
