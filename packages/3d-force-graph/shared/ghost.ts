// Card fake pointer for 3d-force-graph: hover, clicks and drags for one graph
import type { ForceGraph3DInstance, NodeObject } from '3d-force-graph';

/** Any typed graph: `own()` and the ghost do not read node or link fields. */
export type AnyGraph = ForceGraph3DInstance<any, any>;

export interface Ghost {
  /** Moves the fake pointer onto a node (graph coordinates read from the node). */
  node(node: NodeObject): void;
  /** Moves the fake pointer to graph coordinates. */
  at(x: number, y: number, z: number): void;
  /** Moves the fake pointer to container pixels. */
  px(x: number, y: number): void;
  /** Presses and releases where the pointer is (`button` 2 is a right-click). */
  click(button?: 0 | 2): void;
  /** Moves the pointer off the canvas. */
  leave(): void;
  /**
   * Drags a node by (dx, dy) container pixels over `ms`, through DragControls' own pointer
   * events on the canvas. Drags queue page-wide, one at a time. Resolves when released.
   */
  drag(node: NodeObject, dx: number, dy: number, ms?: number): Promise<void>;
}

/**
 * three's DragControls keeps the dragged object in module state (`_selected`), shared by every
 * DragControls on the page, so two fake drags at once would move each other's nodes.
 */
let dragQueue: Promise<void> = Promise.resolve();

/**
 * A fake pointer over one graph. three-render-objects reads hover and clicks from pointer events
 * on its `.scene-container` and the tooltip from mouse events there; the navigation controls
 * and DragControls listen on the canvas. Hover and click events go to the container only and do
 * not bubble, so they never move the camera or reach another card.
 */
export function createGhost(graph: AnyGraph, root: HTMLElement, alive: () => boolean): Ghost {
  let x = -10;
  let y = -10;
  const container = (): HTMLElement | null => root.querySelector('.scene-container');
  const event = (target: Element, type: string, px: number, py: number, button = 0): void => {
    const r = target.getBoundingClientRect();
    const init = { clientX: r.left + px, clientY: r.top + py, button, bubbles: false };
    target.dispatchEvent(
      type.startsWith('pointer')
        ? new PointerEvent(type, { ...init, pointerType: 'mouse', pointerId: 1, isPrimary: true })
        : new MouseEvent(type, init),
    );
  };
  const send = (type: string, button = 0): void => {
    const target = container();
    if (target) event(target, type, x, y, button);
  };
  const frame = (): Promise<void> => new Promise((res) => requestAnimationFrame(() => res()));

  return {
    node(n) {
      this.at(n.x ?? 0, n.y ?? 0, n.z ?? 0);
    },
    at(gx, gy, gz) {
      const p = graph.graph2ScreenCoords(gx, gy, gz);
      this.px(p.x, p.y);
    },
    px(px, py) {
      if (px >= 0 && py >= 0 && x < 0) send('mouseover');
      x = px;
      y = py;
      send('pointermove');
      send('mousemove');
    },
    click(button = 0) {
      send('pointerdown', button);
      send('pointerup', button);
    },
    leave() {
      x = -10;
      y = -10;
      send('pointermove');
      send('mousemove');
      send('mouseout');
    },
    drag(n, dx, dy, ms = 900) {
      const run = async (): Promise<void> => {
        const canvas = graph.renderer().domElement;
        if (!alive()) return;
        this.node(n);
        const x0 = x;
        const y0 = y;
        // The camera controls also listen for pointerdown on the canvas and capture the
        // pointer, which a synthetic event cannot hold: switch them off for the fake drag.
        const controls = graph.controls() as { enabled: boolean };
        const wasEnabled = controls.enabled;
        controls.enabled = false;
        event(canvas, 'pointerdown', x0, y0);
        const start = performance.now();
        for (;;) {
          await frame();
          const t = Math.min(1, (performance.now() - start) / ms);
          if (!alive()) break;
          event(canvas, 'pointermove', x0 + dx * t, y0 + dy * t);
          if (t >= 1) break;
        }
        event(canvas, 'pointerup', x0 + dx, y0 + dy);
        controls.enabled = wasEnabled;
        x = x0 + dx;
        y = y0 + dy;
      };
      const done = dragQueue.then(run, run);
      dragQueue = done.catch(() => {});
      return done;
    },
  };
}
