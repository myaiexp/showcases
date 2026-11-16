// Leafer UI stage: panes on paper, engines freed on unmount, fake pointer
//
// Traps are listed in ./traps.md (add to it).
import type { MountContext } from '@/types.ts';
import type { ILeaferBase } from 'leafer-ui';
import { createGhost, type Ghost } from './ghost.ts';

/** The panes' background: the docs' default colours (black text, editor blue) are drawn for a white page. */
export const PAPER = '#f7f5f0';

/** A Leafer, an App, or anything else with the engine's destroy(sync). */
type Engine = { destroy(sync?: boolean): void; interaction?: ILeaferBase['interaction'] };

export interface StageOptions {
  /** Captions for several engines side by side; one pane with no caption when left out. */
  panes?: readonly string[];
  /** One line under the panes in the full view, such as "Drag a shape". */
  hint?: string;
  /** Full-view pane height (default 420). */
  height?: number;
  /** Full-view pane width cap (default 860). */
  width?: number;
  /** Pane background (default `PAPER`). Pass 'transparent' when the engine paints its own `fill`. */
  paper?: string;
}

export interface Pane {
  /** Hand this to `new Leafer({ view: pane.view })`. The engine adds its canvas inside. */
  view: HTMLDivElement;
  /** CSS pixels of the view. */
  width: number;
  height: number;
  caption: HTMLDivElement | null;
}

export interface Stage extends Pane {
  panes: Pane[];
  preview: boolean;
  /** Control bar under the panes, or null in a card. */
  bar: HTMLElement | null;
  /** The outer column: panes, hint, bar. Append extra full-view panels here. */
  box: HTMLDivElement;
  /** Call right after `new Leafer(...)` / `new App(...)`: destroys it (synchronously) on dispose. */
  own<E extends Engine>(engine: E, pane?: Pane): E;
  /** Destroys an owned engine now and empties its pane, for examples that rebuild one. */
  release(engine: Engine): void;
  /** A fake pointer for a card: drives this engine's interaction in code, with a visible dot. */
  ghost(engine: Engine, pane?: Pane): Ghost;
  /** Calls `frame(dt, t)` every animation frame (seconds) until dispose. */
  loop(frame: (dt: number, t: number) => void): void;
  /** Calls `fn` every `ms` until dispose. */
  every(ms: number, fn: () => void): void;
  /** Calls `fn` once after `ms`, unless disposed first. */
  after(ms: number, fn: () => void): void;
  /** Resolves after `ms`, or rejects with an AbortError once disposed: lets a card script await steps. */
  wait(ms: number): Promise<void>;
  onDispose(fn: () => void): void;
  readonly disposed: boolean;
  dispose(): void;
}

export function createStage(el: HTMLElement, ctx: MountContext, opts: StageOptions = {}): Stage {
  const { preview } = ctx;
  const box = document.createElement('div');
  box.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:10px;width:100%';
  el.append(box);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;justify-content:center;align-items:flex-start;gap:12px;width:100%';
  box.append(row);

  const captions = opts.panes ?? [null];
  const n = captions.length;
  const avail = el.clientWidth || (preview ? 280 : 760);
  const capH = captions[0] === null ? 0 : preview ? 16 : 22;
  const height = Math.floor((preview ? 200 : (opts.height ?? 420)) - capH);
  const width = Math.floor(Math.min(preview ? avail : (opts.width ?? 860), (avail - 12 * (n - 1)) / n));
  const paper = opts.paper ?? PAPER;

  const panes: Pane[] = captions.map((text) => {
    const cell = document.createElement('div');
    cell.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:4px';
    const view = document.createElement('div');
    view.style.cssText = `position:relative;width:${width}px;height:${height}px;overflow:hidden;
      border-radius:6px;background:${paper}`;
    cell.append(view);
    let caption: HTMLDivElement | null = null;
    if (text !== null) {
      caption = document.createElement('div');
      caption.style.cssText = `font:${preview ? 11 : 13}px/1.3 ui-monospace,monospace;color:var(--fg-2);
        text-align:center;max-width:${width}px;overflow-wrap:anywhere`;
      caption.textContent = text;
      cell.append(caption);
    }
    row.append(cell);
    return { view, width, height, caption };
  });

  if (!preview && opts.hint) {
    const hint = document.createElement('div');
    hint.style.cssText = 'font-size:13px;color:var(--fg-3);text-align:center;max-width:680px';
    hint.textContent = opts.hint;
    box.append(hint);
  }
  let bar: HTMLElement | null = null;
  if (!preview) {
    bar = document.createElement('div');
    bar.style.cssText =
      'display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px 16px;max-width:760px';
    box.append(bar);
  }

  let raf = 0;
  const timers = new Set<number>();
  const disposers: (() => void)[] = [];
  const owned = new Map<Engine, () => void>();
  const paneOf = new Map<Engine, Pane>();
  const ghosts: Ghost[] = [];
  let disposed = false;

  const stage: Stage = {
    ...panes[0]!,
    panes,
    preview,
    bar,
    box,
    get disposed() {
      return disposed;
    },
    own(engine, pane = panes[0]!) {
      paneOf.set(engine, pane);
      // Every engine hears keys on the whole document (the editor moves its selection on arrow
      // keys), so a card would react to the reader's typing. Cards send keys through the ghost.
      if (preview && engine.interaction) engine.interaction.config.keyEvent = false;
      // A mount that awaited can get here after unmount: free it at once.
      if (disposed) queueMicrotask(() => freeEngine(engine, pane));
      else owned.set(engine, () => freeEngine(engine, pane));
      return engine;
    },
    release(engine) {
      const free = owned.get(engine);
      owned.delete(engine);
      free?.();
    },
    ghost(engine, pane) {
      const g = createGhost(engine, pane ?? paneOf.get(engine) ?? panes[0]!, () => !disposed && owned.has(engine));
      ghosts.push(g);
      return g;
    },
    loop(frame) {
      let last = performance.now();
      const start = last;
      const tick = (now: number): void => {
        if (disposed) return;
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        frame(dt, (now - start) / 1000);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    },
    every(ms, fn) {
      if (!disposed) timers.add(window.setInterval(fn, ms));
    },
    after(ms, fn) {
      if (disposed) return;
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
    },
    wait(ms) {
      return new Promise((resolve, reject) => {
        if (disposed) return reject(new DOMException('stage disposed', 'AbortError'));
        const id = window.setTimeout(() => {
          timers.delete(id);
          if (disposed) reject(new DOMException('stage disposed', 'AbortError'));
          else resolve();
        }, ms);
        timers.add(id);
        disposers.push(() => reject(new DOMException('stage disposed', 'AbortError')));
      });
    },
    onDispose(fn) {
      if (disposed) fn();
      else disposers.push(fn);
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(raf);
      for (const t of timers) {
        clearInterval(t);
        clearTimeout(t);
      }
      timers.clear();
      for (const g of ghosts) g.dispose();
      for (const fn of disposers.splice(0)) {
        try {
          fn();
        } catch (err) {
          console.error('leafer-ui stage: a dispose callback threw', err);
        }
      }
      for (const free of owned.values()) free();
      owned.clear();
      box.remove();
    },
  };
  ctx.signal.addEventListener('abort', () => stage.dispose(), { once: true });
  return stage;
}

/**
 * Runs a card script (an async function of awaited steps) in a loop until dispose. The
 * stage's `wait()` rejects once disposed, which ends the script quietly.
 */
export function script(stage: Stage, run: () => Promise<void>): void {
  const go = async (): Promise<void> => {
    while (!stage.disposed) await run();
  };
  go().catch((err: unknown) => {
    if (!(err instanceof DOMException && err.name === 'AbortError')) console.error('leafer-ui card script', err);
  });
}

/** Destroys one engine synchronously (the default destroy waits a tick) and empties its pane. */
function freeEngine(engine: Engine, pane: Pane): void {
  try {
    engine.destroy(true);
  } catch (err) {
    // The DOM is dropped below either way; say why destroy stopped part-way.
    console.error('leafer-ui destroy failed', err);
  }
  pane.view.replaceChildren();
}
