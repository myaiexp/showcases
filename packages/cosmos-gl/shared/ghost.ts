// A visible pretend pointer for cards: hovers, clicks, right-clicks
import type { Graph } from '@cosmos.gl/graph';

export interface Ghost {
  /** Moves the pointer to (x, y) in px from the graph box's top-left corner. */
  moveTo(x: number, y: number): void;
  /** Moves the pointer onto point `index` (reads positions back from the GPU). */
  toPoint(index: number): void;
  /** Moves the pointer to the middle of link `source → target`. */
  toLink(source: number, target: number): void;
  /** Presses and releases the left button where the pointer is, then clicks. */
  click(): void;
  /** Right button: pointerdown and contextmenu where the pointer is. */
  contextMenu(): void;
  /** Takes the pointer off the canvas. */
  leave(): void;
  /** Where the pointer is now, px in the box. */
  readonly x: number;
  readonly y: number;
}

/**
 * cosmos.gl listens for pointer events on its canvas, so events dispatched there drive
 * hover, click and context-menu callbacks the same way a mouse does. A dot shows where.
 */
export function ghost(div: HTMLElement, graph: Graph): Ghost {
  const dot = document.createElement('div');
  dot.style.cssText =
    'position:absolute;width:10px;height:10px;margin:-5px 0 0 -5px;border-radius:50%;' +
    'border:2px solid #fff;background:rgb(255 255 255 / 0.25);pointer-events:none;z-index:2;' +
    'transition:left 0.35s ease, top 0.35s ease, transform 0.15s;display:none';
  div.append(dot);
  let x = 0;
  let y = 0;

  const canvas = (): HTMLCanvasElement | null => div.querySelector('canvas');
  const send = (type: string, extra: PointerEventInit = {}): void => {
    const c = canvas();
    if (!c) return;
    const r = c.getBoundingClientRect();
    const init: PointerEventInit = {
      bubbles: true,
      cancelable: true,
      isPrimary: true,
      pointerId: 1,
      pointerType: 'mouse',
      clientX: r.left + x,
      clientY: r.top + y,
      ...extra,
    };
    if (type === 'click' || type === 'contextmenu') c.dispatchEvent(new MouseEvent(type, init));
    else c.dispatchEvent(new PointerEvent(type, init));
  };
  const pressFx = (): void => {
    dot.style.transform = 'scale(0.6)';
    setTimeout(() => (dot.style.transform = ''), 160);
  };

  const g: Ghost = {
    get x() {
      return x;
    },
    get y() {
      return y;
    },
    moveTo(nx, ny) {
      const first = dot.style.display === 'none';
      x = nx;
      y = ny;
      dot.style.display = '';
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      if (first) send('pointerenter');
      send('pointermove');
    },
    toPoint(index) {
      const p = graph.getPointPositions();
      const px = p[index * 2];
      const py = p[index * 2 + 1];
      if (px === undefined || py === undefined) return;
      const [sx, sy] = graph.spaceToScreenPosition([px, py]);
      g.moveTo(sx, sy);
    },
    toLink(source, target) {
      const p = graph.getPointPositions();
      const a = graph.spaceToScreenPosition([p[source * 2] ?? 0, p[source * 2 + 1] ?? 0]);
      const b = graph.spaceToScreenPosition([p[target * 2] ?? 0, p[target * 2 + 1] ?? 0]);
      g.moveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2);
    },
    click() {
      pressFx();
      send('pointerdown', { button: 0, buttons: 1 });
      send('pointerup', { button: 0, buttons: 0 });
      send('click', { button: 0 });
    },
    contextMenu() {
      pressFx();
      send('pointerdown', { button: 2, buttons: 2 });
      send('pointerup', { button: 2, buttons: 0 });
      send('contextmenu', { button: 2 });
    },
    leave() {
      send('pointerleave');
      dot.style.display = 'none';
    },
  };
  return g;
}
