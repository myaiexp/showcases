// Editor kit: card layout, handle points, keyed drags, action tours
import { Rect, type IRectInputData, type IUI } from 'leafer-ui';
import { script, type Stage } from './stage.ts';
import type { Ghost, Modifiers, Point } from './ghost.ts';
import { label } from './basics.ts';
import { button, checkbox, select } from './controls.ts';

export interface Geo {
  /** Docs coordinates (100 px rects) scaled for the pane: cards use 60 px rects. */
  size: number;
  a: Point;
  b: Point;
  c: Point;
}

/** Where the docs' two rects (and a third) go: the docs' 100 px at (100, 100) and (300, 100), rescaled for a card. */
export function geo(stage: Pick<Stage, 'preview'>): Geo {
  if (stage.preview) return { size: 60, a: { x: 36, y: 54 }, b: { x: 150, y: 54 }, c: { x: 93, y: 116 } };
  return { size: 100, a: { x: 120, y: 70 }, b: { x: 320, y: 70 }, c: { x: 220, y: 240 } };
}

/** A point at fraction (fx, fy) of an element's box, in pane pixels (the tree layer is not zoomed). */
export function spot(el: IUI, fx = 0.5, fy = 0.5): Point {
  const b = el.getBounds('box', 'world');
  return { x: b.x + b.width * fx, y: b.y + b.height * fy };
}

type Pointer = { pointerMove(data: object): void };

/** Runs `fn` with modifier keys added to every pointer move the engine receives (the ghost's own moves carry none). */
export async function holding<T>(engine: { interaction?: unknown }, keys: Modifiers, fn: () => Promise<T>): Promise<T | undefined> {
  const i = engine.interaction as Pointer | undefined;
  if (!i) return undefined;
  const original = i.pointerMove;
  i.pointerMove = function (this: Pointer, data: object) {
    return original.call(this, { ...data, ...keys });
  };
  try {
    return await fn();
  } finally {
    delete (i as Partial<Pointer>).pointerMove;
  }
}

/** A ghost drag with keys held (the editor reads modifiers while dragging). */
export async function dragWith(
  engine: { interaction?: unknown },
  ghost: Ghost,
  from: Point,
  to: Point,
  keys: Modifiers,
  ms = 800,
): Promise<void> {
  await holding(engine, keys, () => ghost.drag(from, to, ms, keys));
}

/** A line of text over the top of the pane, refreshed every frame from `read()` (only touched when it changes). */
export function watch(stage: Stage, read: () => string, bottom = false): void {
  const say = label(stage, '', bottom);
  let last = '';
  stage.loop(() => {
    let text = '';
    try {
      text = read();
    } catch {
      text = '';
    }
    if (text !== last) say((last = text));
  });
}

export interface Action {
  name: string;
  run(): void;
}

/**
 * Full view: one button per action. Card: runs the actions in turn, `gap` ms apart, calling `reset` before
 * each round, and prints the running action along the bottom of the pane (`card: false` leaves the card to
 * the example's own script).
 */
export function actions(stage: Stage, items: Action[], opts: { reset?: () => void; gap?: number; first?: number; card?: boolean } = {}): void {
  const say = label(stage, '', true);
  const run = (a: Action): void => {
    say(a.name);
    a.run();
  };
  if (stage.bar) {
    for (const a of items) button(stage.bar, a.name.replace(/^app\.editor\./, ''), () => run(a));
    if (opts.reset) button(stage.bar, 'reset', () => (say(''), opts.reset?.()));
    return;
  }
  if (opts.card === false) return;
  script(stage, async () => {
    opts.reset?.();
    say('');
    await stage.wait(opts.first ?? 900);
    for (const a of items) {
      run(a);
      await stage.wait(opts.gap ?? 1300);
    }
    await stage.wait(400);
  });
}

/** Shows a cursor setting (a CSS name or `{ url, x, y }`) as a tile in a pane corner: cards have no real cursor. */
export function cursorTile(stage: Stage): (name: string, cursor: unknown) => void {
  const tile = document.createElement('div');
  tile.style.cssText = `position:absolute;right:8px;top:6px;z-index:4;pointer-events:none;display:flex;gap:6px;
    align-items:center;font:${stage.preview ? 10 : 12}px/1.3 ui-monospace,monospace;color:#555`;
  stage.view.append(tile);
  return (name, cursor) => {
    tile.replaceChildren();
    const text = document.createElement('span');
    tile.append(text);
    if (typeof cursor === 'string' || !cursor) {
      text.textContent = `${name}: ${cursor ?? '(none)'}`;
      return;
    }
    const c = cursor as { url?: string };
    text.textContent = `${name}:`;
    if (c.url) {
      const img = document.createElement('img');
      img.src = c.url.replace(/^"|"$/g, ''); // the editor quotes data URLs for CSS
      img.style.cssText = 'width:24px;height:24px;background:#fff;border:1px solid #bbb;border-radius:3px';
      tile.append(img);
    }
  };
}

/** Rounds to one decimal, for readouts. */
export const r1 = (n: number | undefined): string => (Math.round((n ?? 0) * 10) / 10).toString();

/** The docs' two editable rects (orange with left corners rounded, yellow with right ones), named A and B. */
export function pair(g: Geo, a: IRectInputData = {}, b: IRectInputData = {}): [Rect, Rect] {
  return [
    Rect.one({ editable: true, name: 'A', fill: '#FEB027', cornerRadius: [20, 0, 0, 20], ...a }, g.a.x, g.a.y, g.size, g.size),
    Rect.one({ editable: true, name: 'B', fill: '#FFE04B', cornerRadius: [0, 20, 20, 0], ...b }, g.b.x, g.b.y, g.size, g.size),
  ];
}

/** `pair` plus the docs' green rect C below them. */
export function trio(g: Geo, c: IRectInputData = {}): [Rect, Rect, Rect] {
  const [a, b] = pair(g);
  return [a, b, Rect.one({ editable: true, name: 'C', fill: '#32cd79', cornerRadius: 30, ...c }, g.c.x, g.c.y, g.size, g.size)];
}

/** A single green rect centred in the pane, the docs' stand-in for "the element" in config examples. */
export function solo(stage: Pick<Stage, 'preview' | 'width' | 'height'>, g: Geo, data: IRectInputData = {}): Rect {
  const s = g.size;
  return Rect.one(
    { editable: true, name: 'A', fill: '#32cd79', cornerRadius: 30, ...data },
    Math.round((stage.width - s) / 2),
    Math.round((stage.height - s) / 2) - (stage.preview ? 6 : 0),
    s,
    s,
  );
}

/** Remembers an element's layout; the returned function puts it back (and nudges a selected editor to follow). */
export function keep(el: IUI, app?: { editor: { update(): void } }): () => void {
  const home = {
    x: el.x,
    y: el.y,
    width: el.width,
    height: el.height,
    rotation: 0,
    skewX: 0,
    skewY: 0,
    scaleX: 1,
    scaleY: 1,
  };
  return () => {
    el.set(home);
    app?.editor.update();
  };
}

/** The docs' sample Text for inner-editor examples: a 120 px wide wrapped sentence, centred in the pane. */
export function textBox(stage: Pick<Stage, 'preview' | 'width' | 'height'>): { x: number; y: number; width: number; fontSize: number } {
  const width = stage.preview ? 130 : 200;
  return { x: Math.round((stage.width - width) / 2), y: Math.round(stage.height / 2) - (stage.preview ? 24 : 30), width, fontSize: stage.preview ? 16 : 20 };
}

/** Drags from the fraction (fx, fy) of `el`'s box by (dx, dy), with keys held when given: a handle, an edge or the body. */
export async function pull(
  app: { interaction?: unknown },
  ghost: Ghost,
  el: IUI,
  [fx, fy]: readonly [number, number],
  [dx, dy]: readonly [number, number],
  keys?: Modifiers,
  ms = 900,
): Promise<void> {
  const from = spot(el, fx, fy);
  const to = { x: from.x + dx, y: from.y + dy };
  if (keys) await dragWith(app, ghost, from, to, keys, ms);
  else await ghost.drag(from, to, ms);
}

/** Changes editor config at runtime and applies it: `tune(app)({ hideOnMove: true })`. */
export function tune(app: { editor: { config: object; updateEditTool(): void } }): (patch: object) => void {
  return (patch) => {
    Object.assign(app.editor.config, patch);
    app.editor.updateEditTool();
  };
}

/**
 * One option to vary. Full view: a select (a checkbox for booleans) that calls `apply`. Card: cycles the values,
 * calling `apply(v)` then `run(v)` (the example's ghost gesture, default a pause) and captions `label = value`.
 */
export function variants<T extends string | number | boolean>(
  stage: Stage,
  label: string,
  values: readonly T[],
  apply: (v: T) => void,
  run?: (v: T) => Promise<void>,
  initial: T = values[0] as T,
): void {
  apply(initial);
  if (stage.bar) {
    if (values.every((v) => typeof v === 'boolean')) checkbox(stage.bar, label, initial as boolean, (v) => apply(v as T));
    else {
      const list = values.map(String);
      select(stage.bar, label, list, (v) => apply(values[list.indexOf(v)] as T), String(initial));
    }
    return;
  }
  const say = label_(stage);
  script(stage, async () => {
    for (const v of values) {
      say(label + ' = ' + String(v));
      apply(v);
      if (run) await run(v);
      else await stage.wait(1500);
    }
  });
}

const label_ = (stage: Stage): ((t: string) => void) => label(stage, '', true);
