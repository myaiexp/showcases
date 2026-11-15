// A pretend mouse for cards: moves and clicks on the scene canvas
import type { Stage } from './frame.ts';

/**
 * Cards get no pointer input, so a `cursor="rayOrigin: mouse"` example moves this one
 * instead. The cursor component listens for mousemove, mousedown and mouseup on the
 * scene's canvas (cursor.js), reading clientX/clientY against the canvas bounds, so
 * synthetic events there drive its raycaster exactly as a mouse would. Positions are
 * fractions of the canvas: (0, 0) is the top left, (0.5, 0.5) the centre.
 */
export interface Ghost {
  /** Moves the pointer to (fx, fy) at once. */
  move(fx: number, fy: number): void;
  /** Glides the pointer to (fx, fy) over ms. */
  glide(fx: number, fy: number, ms?: number): Promise<void>;
  /** Presses and releases at the current position: a cursor click. */
  click(): void;
}

export function ghost(stage: Stage): Ghost {
  const canvas = stage.scene.canvas;
  let fx = 0.5;
  let fy = 0.5;
  let raf = 0;
  stage.own(() => cancelAnimationFrame(raf));

  const send = (type: string): void => {
    const r = canvas.getBoundingClientRect();
    const init = { clientX: r.left + fx * r.width, clientY: r.top + fy * r.height, bubbles: true, cancelable: true, button: 0 };
    canvas.dispatchEvent(new MouseEvent(type, init));
  };

  return {
    move(x, y) {
      fx = x;
      fy = y;
      send('mousemove');
    },
    glide(x, y, ms = 600) {
      cancelAnimationFrame(raf);
      const [x0, y0] = [fx, fy];
      const t0 = performance.now();
      return new Promise((resolve) => {
        const step = (now: number): void => {
          const t = Math.min(1, (now - t0) / ms);
          const e = t * t * (3 - 2 * t);
          fx = x0 + (x - x0) * e;
          fy = y0 + (y - y0) * e;
          send('mousemove');
          if (t < 1) raf = requestAnimationFrame(step);
          else resolve();
        };
        raf = requestAnimationFrame(step);
      });
    },
    click() {
      send('mousedown');
      send('mouseup');
    },
  };
}
