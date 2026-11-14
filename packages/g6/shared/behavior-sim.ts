// Synthetic pointer input for the Behavior cards, which have no real pointer
import type { Graph, Point } from '@antv/g6';
import type { Stage } from './graph.ts';

export type Pt = Point;

export const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** The <canvas> element G listens on. */
function canvasEl(graph: Graph): HTMLElement {
  // getDomElement is typed as the generic G element type; at runtime it is the canvas.
  return graph.getCanvas().getContextService().getDomElement() as unknown as HTMLElement;
}

/** Canvas (graph) coordinates to client coordinates, through the current viewport. */
export function clientOf(graph: Graph, p: Pt): Pt {
  const [vx = 0, vy = 0] = graph.getViewportByCanvas(p);
  const r = canvasEl(graph).getBoundingClientRect();
  return [r.left + vx, r.top + vy];
}

function fire(el: HTMLElement, type: string, [x = 0, y = 0]: Pt, buttons: number): void {
  el.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      cancelable: true,
      composed: true,
      pointerId: 1,
      pointerType: 'mouse',
      isPrimary: true,
      button: 0,
      buttons,
      clientX: x,
      clientY: y,
    }),
  );
}

/**
 * Presses at the first point, moves through the rest and releases at the last, all as
 * pointer events on the canvas element, so the behavior under test runs as it would for a
 * reader. Points are canvas coordinates. Stops quietly once the example is gone.
 */
export async function simDrag(stage: Stage, graph: Graph, path: Pt[], stepMs = 28): Promise<void> {
  const live = () => stage.alive && !graph.destroyed;
  if (!live() || path.length < 2) return;
  const el = canvasEl(graph);
  // Client positions are fixed up front: a drag that pans the canvas moves the canvas
  // coordinates under the pointer, but the pointer itself follows the planned line.
  const pts = path.map((p) => clientOf(graph, p));
  fire(el, 'pointerdown', pts[0]!, 1);
  await sleep(stepMs);
  for (const p of pts.slice(1)) {
    if (!live()) return;
    fire(el, 'pointermove', p, 1);
    await sleep(stepMs);
  }
  if (live()) fire(el, 'pointerup', pts[pts.length - 1]!, 0);
}

/** Straight path from a to b in n steps. */
export function line(a: Pt, b: Pt, n = 10): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n] as Pt);
}

/** A press and release in place: the canvas turns it into pointerdown, pointerup and click. */
export async function simClick(stage: Stage, graph: Graph, p: Pt): Promise<void> {
  if (!stage.alive || graph.destroyed) return;
  const el = canvasEl(graph);
  const c = clientOf(graph, p);
  fire(el, 'pointerdown', c, 1);
  await sleep(40);
  if (!stage.alive || graph.destroyed) return;
  fire(el, 'pointerup', c, 0);
}

/** Moves the pointer over p without pressing. */
export function simHover(graph: Graph, p: Pt | null): void {
  if (graph.destroyed) return;
  const el = canvasEl(graph);
  // Off the canvas: a point far outside every element but still inside the box.
  fire(el, 'pointermove', clientOf(graph, p ?? [-5000, -5000]), 0);
}

/** An ellipse path of n points around (cx, cy), for lasso drags. */
export function loop(cx: number, cy: number, rx: number, ry: number, n = 16): Pt[] {
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry] as Pt;
  });
}

/** Clears every state on every element, so a card can replay a selection from scratch. */
export function clearStates(graph: Graph): Promise<void> {
  const { nodes = [], edges = [], combos = [] } = graph.getData();
  const ids = [...nodes, ...edges, ...combos].map((d) => String(d.id ?? `${d.source}-${d.target}`));
  return graph.setElementState(Object.fromEntries(ids.map((id) => [id, [] as string[]])));
}

/** A wheel tick over canvas point p (negative deltaY zooms in, and scrolls up). */
export function simWheel(graph: Graph, p: Pt, deltaY: number, deltaX = 0, ctrlKey = false): void {
  if (graph.destroyed) return;
  const [x, y] = clientOf(graph, p);
  canvasEl(graph).dispatchEvent(
    new WheelEvent('wheel', { bubbles: true, cancelable: true, composed: true, deltaX, deltaY, ctrlKey, clientX: x, clientY: y }),
  );
}

/**
 * Holds keys down for this graph only: the keys go through the graph's own event emitter,
 * not the window, so other graphs on the page never see them.
 */
export async function simKeys(stage: Stage, graph: Graph, keys: string[], holdMs = 120): Promise<void> {
  if (!stage.alive || graph.destroyed) return;
  for (const key of keys) graph.emit('keydown', { key });
  await sleep(holdMs);
  if (graph.destroyed) return;
  for (const key of [...keys].reverse()) graph.emit('keyup', { key });
}

/** Two quick clicks in the same place, which the canvas reports as a double click. */
export async function simDblClick(stage: Stage, graph: Graph, p: Pt): Promise<void> {
  await simClick(stage, graph, p);
  await sleep(60);
  await simClick(stage, graph, p);
}

/**
 * A small text label pinned over a card's graph, for examples whose result is a viewport
 * move (so a label inside the graph would move away). It lives inside the container and is
 * removed with it.
 */
export function overlay(stage: Stage): (text: string) => void {
  const box = stage.container;
  box.style.position = 'relative';
  const tag = document.createElement('div');
  tag.style.cssText =
    'position:absolute;left:8px;top:6px;z-index:2;pointer-events:none;font:12px/1.3 ui-monospace,monospace;color:#fff;text-shadow:0 0 4px #000';
  box.append(tag);
  return (text) => {
    tag.textContent = text;
  };
}
