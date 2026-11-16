// Fake pointer for cards: drives an engine's interaction, with a visible dot
//
// Cards have pointer-events: none, so a card that shows hover, press, drag or editing calls
// the engine's own interaction methods (pointerMove / pointerDown / pointerUp), the docs'
// "Simulate Interaction" route. Nothing is dispatched on the DOM, so other cards and the
// page never see these events. Points are in the pane's CSS pixels (the canvas's local space).
import type { ILeaferBase, IPointerEvent } from 'leafer-ui';
import type { Pane } from './stage.ts';

type Interactive = { interaction?: ILeaferBase['interaction'] };

export interface Point {
  x: number;
  y: number;
}

export interface Ghost {
  /** Current pointer position. */
  readonly at: Point;
  /** Jumps the pointer (hover moves, or a drag step while pressed). */
  move(x: number, y: number): void;
  /** Moves the pointer there in steps over `ms`, sending a pointer move each frame. */
  glide(x: number, y: number, ms?: number): Promise<void>;
  down(opts?: Modifiers): void;
  up(opts?: Modifiers): void;
  /** Glide there, press, release. */
  tap(x: number, y: number, opts?: Modifiers & { glide?: number }): Promise<void>;
  /** Two taps in quick succession at one point. */
  doubleTap(x: number, y: number): Promise<void>;
  /** Glide to `from`, press, glide to `to` over `ms`, release. */
  drag(from: Point, to: Point, ms?: number, opts?: Modifiers): Promise<void>;
  /** Moves the pointer off the canvas (hover ends). */
  leave(): void;
  /** Sends a key press through the engine's interaction (KeyEvent listeners, editor shortcuts). */
  key(code: string, key?: string, opts?: Modifiers): void;
  /** Shows or hides the dot. */
  show(on: boolean): void;
  dispose(): void;
}

export interface Modifiers {
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  /** 1 left (default), 2 right. */
  buttons?: number;
}

/** The DOM-event methods the library may call on `origin`; a fake event has nothing to cancel. */
const ORIGIN = { preventDefault() {}, stopPropagation() {}, stopImmediatePropagation() {} };

export function createGhost(engine: Interactive, pane: Pane, alive: () => boolean): Ghost {
  const dot = document.createElement('div');
  dot.style.cssText = `position:absolute;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;
    border-radius:50%;background:rgba(228,87,46,0.35);border:2px solid #e4572e;pointer-events:none;
    z-index:5;transition:transform 0.08s;opacity:0`;
  pane.view.append(dot);
  const at: Point = { x: pane.width / 2, y: pane.height / 2 };
  let pressed = false;
  let frame = 0;

  const event = (opts: Modifiers = {}): IPointerEvent => ({
    x: at.x,
    y: at.y,
    pointerType: 'mouse',
    buttons: opts.buttons ?? (pressed ? 1 : 0),
    shiftKey: !!opts.shiftKey,
    ctrlKey: !!opts.ctrlKey,
    altKey: !!opts.altKey,
    metaKey: !!opts.metaKey,
    time: Date.now(),
    origin: ORIGIN,
  });
  const place = (): void => {
    dot.style.left = `${at.x}px`;
    dot.style.top = `${at.y}px`;
    dot.style.transform = pressed ? 'scale(0.7)' : 'scale(1)';
  };
  const send = (fn: (i: NonNullable<Interactive['interaction']>) => void): void => {
    const i = engine.interaction;
    if (!alive() || !i) return;
    try {
      fn(i);
    } catch (err) {
      console.error('leafer-ui ghost: interaction threw', err);
    }
  };

  const ghost: Ghost = {
    at,
    move(x, y) {
      at.x = x;
      at.y = y;
      place();
      send((i) => i.pointerMove(event({ buttons: pressed ? 1 : 0 })));
    },
    glide(x, y, ms = 400) {
      dot.style.opacity = '1';
      const from = { ...at };
      const start = performance.now();
      cancelAnimationFrame(frame);
      return new Promise((resolve) => {
        const step = (now: number): void => {
          if (!alive()) return resolve();
          const k = Math.min(1, (now - start) / ms);
          const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
          ghost.move(from.x + (x - from.x) * e, from.y + (y - from.y) * e);
          if (k < 1) frame = requestAnimationFrame(step);
          else resolve();
        };
        frame = requestAnimationFrame(step);
      });
    },
    down(opts) {
      pressed = true;
      place();
      send((i) => i.pointerDown(event({ buttons: 1, ...opts })));
    },
    up(opts) {
      pressed = false;
      place();
      send((i) => i.pointerUp(event({ buttons: 0, ...opts })));
    },
    async tap(x, y, opts = {}) {
      await ghost.glide(x, y, opts.glide ?? 350);
      ghost.down(opts);
      await pause(70);
      ghost.up(opts);
    },
    async doubleTap(x, y) {
      await ghost.glide(x, y, 350);
      ghost.down();
      ghost.up();
      await pause(90);
      ghost.down();
      ghost.up();
    },
    async drag(from, to, ms = 700, opts) {
      await ghost.glide(from.x, from.y, 350);
      ghost.down(opts);
      await pause(60);
      await ghost.glide(to.x, to.y, ms);
      ghost.up(opts);
    },
    leave() {
      at.x = -50;
      at.y = -50;
      place();
      dot.style.opacity = '0';
      send((i) => i.cancelHover());
    },
    key(code, key = code, opts = {}) {
      send((i) => {
        const data = { ...event(opts), code, key };
        // The stage turns document key events off for cards; let this one through.
        const was = i.config.keyEvent;
        i.config.keyEvent = true;
        try {
          i.keyDown(data);
          i.keyUp(data);
        } finally {
          i.config.keyEvent = was;
        }
      });
    },
    show(on) {
      dot.style.opacity = on ? '1' : '0';
    },
    dispose() {
      cancelAnimationFrame(frame);
      dot.remove();
    },
  };
  return ghost;
}

const pause = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));
