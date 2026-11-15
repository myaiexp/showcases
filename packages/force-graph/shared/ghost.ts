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
   * Drags and pans queue page-wide, one at a time. Resolves when released.
   */
  drag(node: NodeObject, dx: number, dy: number, ms?: number): Promise<void>;
  /**
   * Presses on the background at container pixels (x, y) and moves by (dx, dy) over `ms`, the
   * mouse events d3-zoom pans on. `keys` adds modifier keys to every event. Queued with drags.
   */
  pan(x: number, y: number, dx: number, dy: number, ms?: number, keys?: Keys): Promise<void>;
}

/** Modifier keys held during a fake gesture. */
export interface Keys {
  shiftKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
}

/**
 * d3-drag and d3-zoom bind their move and release listeners on `window`, d3-drag under one fixed
 * name (`mousemove.drag`), so a second drag started anywhere on the page replaces the first
 * one's listeners, and every gesture in progress hears every other gesture's window moves.
 * Card drags and pans therefore run one at a time across the whole page.
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
  const queue = (run: () => Promise<void>): Promise<void> => {
    const done = dragQueue.then(run, run);
    dragQueue = done.catch(() => {});
    return done;
  };
  /**
   * mousedown on the canvas, then moves and the release on `window`, where d3-drag and d3-zoom
   * listen once a gesture starts. The release is always sent, even when the graph is unmounted
   * part-way, so no window listener is left behind.
   */
  const gesture = async (x0: number, y0: number, dx: number, dy: number, ms: number, keys: Keys): Promise<void> => {
    const canvas = container()?.querySelector('canvas');
    if (!canvas || !alive()) return;
    const r = canvas.getBoundingClientRect();
    const at = (t: number): MouseEventInit => ({
      ...keys,
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
      return queue(async () => {
        if (!alive()) return;
        this.node(n);
        // The hover lookup reads a shadow canvas repainted at most every 800 ms: give it a frame.
        await frame();
        await gesture(x, y, dx, dy, ms, {});
      });
    },
    pan(px, py, dx, dy, ms = 600, keys = {}) {
      return queue(() => gesture(px, py, dx, dy, ms, keys));
    },
  };
}
