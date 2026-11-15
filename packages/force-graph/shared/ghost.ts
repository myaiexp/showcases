// Card fake pointer for force-graph: hover, clicks and drags for one graph
import type { ForceGraphGeneric, NodeObject } from 'force-graph';

type AnyGraph = ForceGraphGeneric<any, any, any>;

export interface Ghost {
  /** Moves the fake pointer onto a node (graph coordinates read from the node). */
  node(node: NodeObject): void;
  /** Moves the fake pointer to graph coordinates. */
  at(x: number, y: number): void;
  /** Moves the fake pointer to container pixels. */
  px(x: number, y: number): void;
  /** Presses and releases where the pointer is (`button` 2 is a right-click). */
  click(button?: 0 | 2): void;
  /** Moves the pointer off the canvas. */
  leave(): void;
  /**
   * Drags a node by (dx, dy) container pixels over `ms`, through d3-drag's own mouse events.
   * Drags queue page-wide, one at a time (see `queueDrag`). Resolves when released.
   */
  drag(node: NodeObject, dx: number, dy: number, ms?: number): Promise<void>;
}

/**
 * d3-drag binds its move and release listeners on `window` under one fixed name
 * (`mousemove.drag`), so a second drag started anywhere on the page replaces the first one's
 * listeners. Card drags therefore run one at a time across the whole page.
 */
let dragQueue: Promise<void> = Promise.resolve();

/**
 * A fake pointer over one graph. force-graph reads the pointer position from pointer events on
 * its `.force-graph-container` and the tooltip from mouse events there; the events here go to
 * that container only and do not bubble. d3-zoom listens on the canvas, so they never pan.
 */
export function createGhost(graph: AnyGraph, root: HTMLElement, alive: () => boolean): Ghost {
  let x = -10;
  let y = -10;
  const container = (): HTMLElement | null => root.querySelector('.force-graph-container');
  const send = (type: string, button = 0): void => {
    const target = container();
    if (!target) return;
    const r = target.getBoundingClientRect();
    const init = { clientX: r.left + x, clientY: r.top + y, button, bubbles: false };
    target.dispatchEvent(type.startsWith('pointer') ? new PointerEvent(type, { ...init, pointerType: 'mouse' }) : new MouseEvent(type, init));
  };
  const move = (): void => {
    send('pointermove');
    send('mousemove');
  };
  const frame = (): Promise<void> => new Promise((res) => requestAnimationFrame(() => res()));

  return {
    node(n) {
      this.at(n.x ?? 0, n.y ?? 0);
    },
    at(gx, gy) {
      const p = graph.graph2ScreenCoords(gx, gy);
      this.px(p.x, p.y);
    },
    px(px, py) {
      const inside = px >= 0 && py >= 0;
      if (inside && x < 0) send('mouseover');
      x = px;
      y = py;
      move();
    },
    click(button = 0) {
      send('pointerdown', button);
      send('pointerup', button);
    },
    leave() {
      x = -10;
      y = -10;
      move();
      send('mouseout');
    },
    drag(n, dx, dy, ms = 900) {
      const run = async (): Promise<void> => {
        const canvas = container()?.querySelector('canvas');
        if (!canvas || !alive()) return;
        this.node(n);
        // The hover lookup reads a shadow canvas repainted at most every 800 ms: give it a frame.
        await frame();
        const r = canvas.getBoundingClientRect();
        const x0 = x;
        const y0 = y;
        const at = (t: number): MouseEventInit => ({
          clientX: r.left + x0 + dx * t,
          clientY: r.top + y0 + dy * t,
          button: 0,
          view: window,
        });
        canvas.dispatchEvent(new MouseEvent('mousedown', { ...at(0), bubbles: false }));
        const start = performance.now();
        for (;;) {
          await frame();
          const t = Math.min(1, (performance.now() - start) / ms);
          if (!alive()) break;
          window.dispatchEvent(new MouseEvent('mousemove', at(t)));
          if (t >= 1) break;
        }
        window.dispatchEvent(new MouseEvent('mouseup', at(1)));
        x = x0 + dx;
        y = y0 + dy;
      };
      const done = dragQueue.then(run, run);
      dragQueue = done.catch(() => {});
      return done;
    },
  };
}
