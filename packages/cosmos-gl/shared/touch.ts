// A pretend finger for cards: sends touch-type pointer events to the canvas
import type { Stage } from './stage.ts';

export interface Finger {
  /** Puts the finger down at (x, y), px from the graph box's top-left. */
  down(x: number, y: number): void;
  /** Lifts the finger; `click` also sends the click a browser synthesizes after a tap. */
  up(click?: boolean): void;
  /** A tap: down, up, click. */
  tap(x: number, y: number): void;
  /** A press held for `ms`, then lifted, followed by the click a browser would still send. */
  hold(x: number, y: number, ms: number): Promise<void>;
}

/**
 * cosmos.gl reads pointer events off its canvas and treats any pointerType but "mouse" as touch
 * (tap, long-press, no hover). These events take the same path a real finger does.
 */
export function finger(stage: Stage): Finger {
  const dot = document.createElement('div');
  dot.style.cssText =
    'position:absolute;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;display:none;' +
    'background:rgb(255 255 255 / 0.3);border:2px solid #fff;pointer-events:none;z-index:2';
  stage.div.append(dot);
  stage.onDispose(() => dot.remove());
  let x = 0;
  let y = 0;
  const send = (type: string, buttons: number): void => {
    const canvas = stage.div.querySelector('canvas');
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    const init: PointerEventInit = {
      bubbles: true,
      cancelable: true,
      isPrimary: true,
      pointerId: 7,
      pointerType: 'touch',
      button: type === 'pointerdown' ? 0 : -1,
      buttons,
      clientX: r.left + x,
      clientY: r.top + y,
    };
    canvas.dispatchEvent(type === 'click' ? new MouseEvent(type, init) : new PointerEvent(type, init));
  };
  const f: Finger = {
    down(nx, ny) {
      x = nx;
      y = ny;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      dot.style.display = '';
      send('pointerenter', 0);
      send('pointerdown', 1);
    },
    up(click = true) {
      send('pointerup', 0);
      send('pointerleave', 0);
      dot.style.display = 'none';
      if (click) send('click', 0);
    },
    tap(nx, ny) {
      f.down(nx, ny);
      f.up(true);
    },
    async hold(nx, ny, ms) {
      f.down(nx, ny);
      await stage.wait(ms);
      f.up(true);
    },
  };
  return f;
}
