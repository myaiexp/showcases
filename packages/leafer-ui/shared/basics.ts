// Helpers for the guide and config examples: card scaling, an on-pane label, a fake wheel
import type { ILeaferBase, IUI, IWheelEvent } from 'leafer-ui';
import { script, type Stage } from './stage.ts';
import type { Point } from './ghost.ts';

/** The docs' green. */
export const GREEN = '#32cd79';

/** The docs place shapes in a full window; this scales a length down for the 260 x 200 card. */
export function sizer(stage: Stage): (n: number) => number {
  return (n) => (stage.preview ? Math.round(n * 0.8) : n);
}

/** A monospace line over the top-left of the pane, for values the example wants to show. */
export function label(stage: Stage, text = '', bottom = false): (t: string) => void {
  const div = document.createElement('div');
  div.style.cssText = `position:absolute;left:8px;${bottom ? 'bottom' : 'top'}:6px;right:8px;z-index:4;
    pointer-events:none;font:${stage.preview ? 10 : 12}px/1.35 ui-monospace,monospace;color:#8a8a8a;white-space:pre-wrap`;
  div.textContent = text;
  stage.view.append(div);
  return (t) => {
    div.textContent = t;
  };
}

export interface WheelInput {
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
  ctrlKey?: boolean;
  shiftKey?: boolean;
}

/** Feeds the engine's own interaction a wheel turn at pane point (x, y): the card's stand-in for a mouse wheel. */
export function fakeWheel(engine: { interaction?: ILeaferBase['interaction'] }, w: WheelInput): void {
  const origin = { preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() {} };
  const data = {
    x: w.x,
    y: w.y,
    deltaX: w.deltaX ?? 0,
    deltaY: w.deltaY ?? 0,
    ctrlKey: !!w.ctrlKey,
    shiftKey: !!w.shiftKey,
    altKey: false,
    metaKey: false,
    buttons: 0,
    pointerType: 'mouse',
    time: Date.now(),
    origin,
  } as unknown as IWheelEvent;
  (engine.interaction as { wheel?(d: IWheelEvent): void } | undefined)?.wheel?.(data);
}

/** Runs `step(k)` for k from 0 to 1 over `ms` (one call per frame): a tiny tween for card scripts. */
export function tween(stage: Stage, ms: number, step: (k: number) => void): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();
    const tick = (now: number): void => {
      if (stage.disposed) return resolve();
      const k = Math.min(1, (now - start) / ms);
      step(k);
      if (k < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });
}

/** A card script that drags `engine`'s element at `a` to `b` and back, forever. */
export function dragToAndFro(stage: Stage, engine: Parameters<Stage['ghost']>[0], a: Point, b: Point): void {
  const ghost = stage.ghost(engine);
  script(stage, async () => {
    await ghost.drag(a, b, 800);
    await stage.wait(500);
    await ghost.drag(b, a, 800);
    await stage.wait(500);
  });
}

/** Makes a card's element drift up and down (`offsetY`), for examples with nothing to drag. */
export function bob(stage: Stage, el: IUI, amp = 8): void {
  stage.loop((_dt, t) => {
    el.offsetY = Math.sin(t * 2) * amp;
  });
}

/** A card script that glides the ghost onto `p`, holds, leaves, and repeats: hover on, hover off. */
export function hoverLoop(stage: Stage, engine: Parameters<Stage['ghost']>[0], p: Point, hold = 900): void {
  const ghost = stage.ghost(engine);
  script(stage, async () => {
    ghost.leave();
    await stage.wait(700);
    await ghost.glide(p.x, p.y, 500);
    await stage.wait(hold);
    ghost.leave();
    await stage.wait(hold);
  });
}

export interface TourOptions {
  /** Zoom in and out with fake wheel turns (default true). */
  zoom?: boolean;
  /** Pan down and back up with fake wheel turns (default true). */
  pan?: boolean;
  /** Hold ctrl for zoom turns (default true; false for engines whose wheel zooms directly). */
  ctrl?: boolean;
  /** Hold shift while panning, to pan sideways. */
  shift?: boolean;
  /** Where the wheel turns (default the pane's centre). */
  at?: Point;
  /** Pause between rounds in ms. */
  hold?: number;
  /** Wheel turns per pan leg (default 6) and their delta (default 30). */
  panSteps?: number;
  panDelta?: number;
  /**
   * Called at the start of every round with the round number, before any wheel turn: the place to
   * switch the setting a card compares. Switching it on a separate timer lands mid-round, so the
   * turns that should undo a zoom or pan act differently and the view drifts round after round.
   */
  round?: (n: number) => void;
  /** The zoom layer to put back to x 0, y 0, scale 1 at the start of every round. */
  reset?: { set(data: { x: number; y: number; scaleX: number; scaleY: number }): void };
  /** Pan along both axes at once (deltaX and deltaY), to show the scroll constraints. */
  diagonal?: boolean;
}

/** A card script for viewport examples: wheel turns that zoom in, zoom out, pan one way and back, forever. */
export function wheelTour(stage: Stage, engine: { interaction?: ILeaferBase['interaction'] }, o: TourOptions = {}): void {
  const at = o.at ?? { x: stage.width / 2, y: stage.height / 2 };
  const turn = async (n: number, input: Omit<WheelInput, 'x' | 'y'>): Promise<void> => {
    for (let i = 0; i < n; i++) {
      fakeWheel(engine, { ...at, ...input });
      await stage.wait(70);
    }
  };
  const steps = o.panSteps ?? 6;
  const d = o.panDelta ?? 30;
  let n = 0;
  script(stage, async () => {
    o.reset?.set({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
    o.round?.(n++);
    await stage.wait(700);
    if (o.zoom !== false) {
      await turn(3, { deltaY: -15, ctrlKey: o.ctrl !== false });
      await stage.wait(o.hold ?? 600);
      await turn(3, { deltaY: 15, ctrlKey: o.ctrl !== false });
      await stage.wait(o.hold ?? 600);
    }
    if (o.pan !== false) {
      await turn(steps, o.shift ? { deltaX: d, shiftKey: true } : o.diagonal ? { deltaX: d, deltaY: d } : { deltaY: d });
      await stage.wait(o.hold ?? 600);
      await turn(steps, o.shift ? { deltaX: -d, shiftKey: true } : o.diagonal ? { deltaX: -d, deltaY: -d } : { deltaY: -d });
      await stage.wait(o.hold ?? 600);
    }
  });
}

/** Prints the layer's x, y and scale in the pane's bottom corner, refreshed every frame. */
export function viewReadout(stage: Stage, layer: { x?: number; y?: number; scaleX?: number }): void {
  const say = label(stage, '', true);
  stage.loop(() => say(`x ${Math.round(layer.x ?? 0)}  y ${Math.round(layer.y ?? 0)}  scale ${(layer.scaleX ?? 1).toFixed(2)}`));
}

/** Steps through `values` every `ms`, calling `apply` with each (the first at once): a card's stand-in for a control. */
export function cycle<T>(stage: Stage, values: readonly T[], apply: (v: T, i: number) => void, ms = 2600): void {
  let i = 0;
  apply(values[0]!, 0);
  stage.every(ms, () => {
    i = (i + 1) % values.length;
    apply(values[i]!, i);
  });
}
