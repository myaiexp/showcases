// Fake pointer for cards: moves, clicks, drags and wheel sent to one Canvas
import { Point, util, type Canvas, type FabricObject, type XY } from 'fabric';

export interface GhostKeys {
  shiftKey?: boolean;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
}

export interface Ghost {
  /** Moves the pointer (no button) to a scene point over `ms`, firing hover events on the way. */
  move(to: XY, ms?: number): Promise<void>;
  /** Presses at the current point, moves to `to` over `ms`, releases. */
  dragTo(to: XY, ms?: number, keys?: GhostKeys): Promise<void>;
  /** Moves to `from`, then drags to `to`. */
  drag(from: XY, to: XY, ms?: number, keys?: GhostKeys): Promise<void>;
  /** Presses and releases along a polyline of scene points: a free-drawing stroke. */
  stroke(points: readonly XY[], ms?: number): Promise<void>;
  /** Moves to `at`, presses and releases. */
  click(at: XY, keys?: GhostKeys): Promise<void>;
  /** A double click at `at` (fabric reads the native dblclick event). */
  dblclick(at: XY): Promise<void>;
  /** One wheel turn over `at`; negative `deltaY` zooms in on most handlers. */
  wheel(at: XY, deltaY: number, keys?: GhostKeys): void;
  /** Leaves the canvas: fires mouse:out on whatever was hovered. */
  leave(): void;
  /** Hides the drawn cursor until the next move. */
  hide(): void;
}

// fabric's own handlers, called directly so the ghost never adds the document-level move/up
// listeners that a real mousedown adds. Those listeners would also hear the reader's real mouse
// moving over the gallery and drag the card's objects to it.
interface Internals {
  _cacheTransformEventData(e: Event): void;
  _resetTransformEventData(): void;
  __onMouseDown(e: Event): void;
  __onMouseMove(e: Event): void;
  __onMouseUp(e: Event): void;
}

const wait = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

export function createGhost(canvas: Canvas, frame: HTMLElement, alive: () => boolean): Ghost {
  const inner = canvas as unknown as Internals;
  const upper = canvas.upperCanvasEl;
  let at = new Point(canvas.width / 2, canvas.height / 2).transform(util.invertTransform(canvas.viewportTransform));
  let pressed = false;

  const cursor = document.createElement('div');
  cursor.style.cssText = `position:absolute;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;
    border-radius:50%;border:2px solid #fff;background:rgba(255,64,129,0.75);box-shadow:0 0 0 1px rgba(0,0,0,0.35);
    pointer-events:none;z-index:5;opacity:0;transition:opacity .2s,transform .1s`;
  frame.append(cursor);

  const client = (p: XY): { clientX: number; clientY: number } => {
    const v = new Point(p).transform(canvas.viewportTransform);
    const r = upper.getBoundingClientRect();
    const sx = r.width / (canvas.width || 1);
    const sy = r.height / (canvas.height || 1);
    return { clientX: r.left + v.x * sx, clientY: r.top + v.y * sy };
  };
  const showAt = (p: XY): void => {
    const v = new Point(p).transform(canvas.viewportTransform);
    cursor.style.left = `${v.x}px`;
    cursor.style.top = `${v.y}px`;
    cursor.style.opacity = '1';
    cursor.style.transform = pressed ? 'scale(0.75)' : '';
  };
  const event = (type: string, p: XY, keys: GhostKeys = {}, init: MouseEventInit = {}): MouseEvent => {
    const e = new MouseEvent(type, {
      ...client(p),
      ...keys,
      button: 0,
      buttons: pressed ? 1 : 0,
      bubbles: true,
      cancelable: true,
      ...init,
    });
    // getPointer() reads scroll offsets from the event's target: point it at the upper canvas.
    Object.defineProperty(e, 'target', { value: upper });
    return e;
  };
  const call = (fn: '__onMouseDown' | '__onMouseMove' | '__onMouseUp', e: Event): void => {
    if (!alive()) return;
    inner._cacheTransformEventData(e);
    inner[fn](e);
    inner._resetTransformEventData();
  };
  const glide = async (to: XY, ms: number, keys?: GhostKeys): Promise<void> => {
    const from = at;
    const steps = Math.max(1, Math.round(ms / 16));
    for (let i = 1; i <= steps; i++) {
      if (!alive()) return;
      const t = i / steps;
      const k = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      at = new Point(from.x + (to.x - from.x) * k, from.y + (to.y - from.y) * k);
      showAt(at);
      call('__onMouseMove', event('mousemove', at, keys));
      await wait(ms / steps);
    }
  };

  const ghost: Ghost = {
    move: (to, ms = 400) => glide(to, ms),
    async dragTo(to, ms = 700, keys) {
      pressed = true;
      showAt(at);
      call('__onMouseDown', event('mousedown', at, keys));
      await wait(60);
      await glide(to, ms, keys);
      await wait(60);
      pressed = false;
      call('__onMouseUp', event('mouseup', at, keys));
      if (alive()) showAt(at);
    },
    async drag(from, to, ms = 700, keys) {
      await glide(from, 350);
      await wait(120);
      await ghost.dragTo(to, ms, keys);
    },
    async stroke(points, ms = 900) {
      if (!points.length) return;
      await glide(points[0]!, 250);
      pressed = true;
      call('__onMouseDown', event('mousedown', at));
      const per = ms / Math.max(1, points.length - 1);
      for (const p of points.slice(1)) {
        if (!alive()) return;
        at = new Point(p);
        showAt(at);
        call('__onMouseMove', event('mousemove', at));
        await wait(per);
      }
      pressed = false;
      call('__onMouseUp', event('mouseup', at));
    },
    async click(p, keys) {
      await glide(p, 350);
      await wait(100);
      pressed = true;
      showAt(at);
      call('__onMouseDown', event('mousedown', at, keys));
      await wait(90);
      pressed = false;
      call('__onMouseUp', event('mouseup', at, keys));
      if (alive()) showAt(at);
    },
    async dblclick(p) {
      await ghost.click(p);
      await wait(60);
      await ghost.click(p);
      if (alive()) upper.dispatchEvent(event('dblclick', at, {}, { detail: 2 }));
    },
    wheel(p, deltaY, keys = {}) {
      if (!alive()) return;
      at = new Point(p);
      showAt(at);
      const e = new WheelEvent('wheel', { ...client(p), ...keys, deltaY, bubbles: true, cancelable: true });
      upper.dispatchEvent(e);
    },
    leave() {
      if (!alive()) return;
      upper.dispatchEvent(event('mouseout', at, {}, { relatedTarget: document.body }));
      cursor.style.opacity = '0';
    },
    hide() {
      cursor.style.opacity = '0';
    },
  };
  return ghost;
}

/**
 * The scene point of one of an object's controls ('tl', 'br', 'mtr', 'mr', …), for ghost drags.
 * Controls are laid out in viewport space (oCoords); call `obj.setCoords()` first after changes.
 */
export function controlPoint(obj: FabricObject, name: string): Point {
  const vp = obj.oCoords[name];
  if (!vp) throw new Error(`no control '${name}' on ${obj.type}`);
  const vpt = obj.canvas?.viewportTransform;
  return vpt ? new Point(vp).transform(util.invertTransform(vpt)) : new Point(vp);
}
