// Core API helpers: a log that shows in the readout, the caption and an in-scene text board
import type { Stage } from './frame.ts';
import type { Entity } from './types.ts';

/**
 * Most Core API examples tell the reader what happened (a lifecycle handler ran, an event
 * arrived, a getter returned). `createLog` sends each line to the three places a reader
 * might look: the readout under the full view, the one-line caption (which cards show
 * too), and, when given, a `text` board inside the scene itself.
 */
export interface Log {
  /** Appends a line (newest last); older lines scroll away. */
  (msg: string): void;
  /** Replaces everything shown with `text` (for live snapshots rather than a history). */
  show(text: string): void;
  clear(): void;
  readonly lines: readonly string[];
}

/** Markup for a dark board that shows text: give it an id and `createLog` fills it. */
export function board(id: string, position = '0 1.6 -3', width = 4.4, height = 2.2, wrapCount = 46): string {
  return `<a-entity id="${id}" position="${position}" geometry="primitive: plane; width: ${width}; height: ${height}"
      material="color: #1d2d3d; shader: flat; opacity: 0.92"
      text="value: ; color: #bfe3ff; font: monoid; width: ${width - 0.4}; wrapCount: ${wrapCount}; align: left; anchor: center; baseline: center"></a-entity>`;
}

export function createLog(stage: Stage, opts: { max?: number; board?: Entity | null; caption?: boolean } = {}): Log {
  const { max = 8, caption = true } = opts;
  const lines: string[] = [];
  const out = stage.readout();
  const paint = (): void => {
    const text = lines.join('\n');
    if (out) out.textContent = text;
    opts.board?.setAttribute('text', 'value', text);
    if (caption) stage.caption(lines[lines.length - 1] ?? '');
  };
  const log = ((msg: string): void => {
    lines.push(msg);
    if (lines.length > max) lines.splice(0, lines.length - max);
    paint();
  }) as Log & { lines: string[] };
  log.show = (text) => {
    lines.splice(0, lines.length, ...text.split('\n'));
    paint();
  };
  log.clear = () => {
    lines.length = 0;
    paint();
  };
  Object.defineProperty(log, 'lines', { get: () => lines });
  return log;
}

/** Trims a number for readouts: 1.2346 -> 1.23. */
export function n(value: number, digits = 2): string {
  return Number(value.toFixed(digits)).toString();
}

/** `{x, y, z}` as "x y z". */
export function vec(v: { x: number; y: number; z: number }, digits = 2): string {
  return `${n(v.x, digits)} ${n(v.y, digits)} ${n(v.z, digits)}`;
}

/**
 * Catches events that fire before `run` starts (assets loading, the scene's own `loaded`):
 * call it from `setup`, with the document of the iframe it runs in. Events from A-Frame
 * elements bubble, so one capture listener on the document sees them all.
 */
export function catchEarly(names: string[], handler: (name: string, evt: CustomEvent, time: number) => void): void {
  const t0 = performance.now();
  for (const name of names) {
    document.addEventListener(name, (evt) => handler(name, evt as CustomEvent, performance.now() - t0), true);
  }
}

/** `el.setAttribute(name, value, true)`: the clobber form, which `types.ts`'s Entity has no overload for. */
export function clobber(el: Entity, name: string, value: object): void {
  (el as unknown as { setAttribute(n: string, v: object, c: boolean): void }).setAttribute(name, value, true);
}

/**
 * Resolves when every `<a-asset-item>` under `root` has loaded or failed. With markup injected
 * after the page loads, `<a-assets>` does not always wait for its items (they are not yet
 * upgraded when it connects), so `run()` can start before `item.data` is set.
 */
export function itemsLoaded(root: ParentNode): Promise<void> {
  const items = [...root.querySelectorAll('a-asset-item')] as (HTMLElement & { hasLoaded?: boolean })[];
  return Promise.all(
    items.map(
      (el) =>
        new Promise<void>((resolve) => {
          if (el.hasLoaded) return resolve();
          el.addEventListener('loaded', () => resolve());
          el.addEventListener('error', () => resolve());
          // An error that fired before this call cannot be seen again: stop waiting after a while.
          setTimeout(resolve, 2500);
        }),
    ),
  ).then(() => undefined);
}
