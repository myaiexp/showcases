// Synthetic pointer for cards, which get no real input: events in view coordinates
import type { View } from 'vega';

export interface Ghost {
  /** Moves the pointer to (x, y): pixels from the data rectangle's top-left (view.origin()), where scales map. */
  move(x: number, y: number): void;
  down(x: number, y: number): void;
  up(x: number, y: number): void;
  click(x: number, y: number): void;
  dblclick(x: number, y: number): void;
  /** A wheel turn at (x, y); negative deltaY zooms in for the usual zoom specs. */
  wheel(x: number, y: number, deltaY: number): void;
  /** The pointer leaves the view. */
  out(): void;
  /** Drags from a to b over `ms`, in `steps` moves. */
  drag(a: readonly [number, number], b: readonly [number, number], ms?: number, steps?: number): Promise<void>;
}

/**
 * Dispatches pointer and mouse events on the view's canvas at data-rectangle coordinates,
 * so `view.scale('x')(value)` gives a ghost position directly. Vega's
 * canvas handler picks the item under (clientX, clientY) itself, and maps client points
 * through CSS transforms, so this works on a scaled card. The SVG renderer picks by DOM
 * target instead, so a ghost needs the canvas renderer. Both the pointer* and the mouse*
 * twin are sent, so specs listening to either see the gesture.
 */
export function createGhost(view: View, isAlive: () => boolean): Ghost {
  const target = (): HTMLElement | null => view.container()?.querySelector('canvas') ?? null;
  let last: [number, number] | null = null;

  const client = (el: HTMLElement, x: number, y: number): { clientX: number; clientY: number } => {
    const rect = el.getBoundingClientRect();
    const sx = el.offsetWidth ? rect.width / el.offsetWidth : 1;
    const sy = el.offsetHeight ? rect.height / el.offsetHeight : 1;
    const [ox, oy] = view.origin();
    return { clientX: rect.left + (x + ox) * sx, clientY: rect.top + (y + oy) * sy };
  };

  const send = (pointer: string, mouse: string | null, x: number, y: number, init: MouseEventInit = {}): void => {
    const el = target();
    if (!el || !isAlive()) return;
    const at = { ...client(el, x, y), bubbles: true, cancelable: true, view: window, ...init };
    if (pointer) el.dispatchEvent(new PointerEvent(pointer, { ...at, pointerId: 1, pointerType: 'mouse', isPrimary: true }));
    if (mouse) el.dispatchEvent(new MouseEvent(mouse, at));
    last = [x, y];
  };

  const ghost: Ghost = {
    move(x, y) {
      if (!last) send('pointerover', 'mouseover', x, y);
      send('pointermove', 'mousemove', x, y);
    },
    down(x, y) {
      send('pointerdown', 'mousedown', x, y, { buttons: 1 });
    },
    up(x, y) {
      send('pointerup', 'mouseup', x, y);
    },
    click(x, y) {
      ghost.move(x, y);
      ghost.down(x, y);
      ghost.up(x, y);
      send('', 'click', x, y);
    },
    dblclick(x, y) {
      ghost.click(x, y);
      ghost.click(x, y);
      send('', 'dblclick', x, y);
    },
    wheel(x, y, deltaY) {
      const el = target();
      if (!el || !isAlive()) return;
      el.dispatchEvent(new WheelEvent('wheel', { ...client(el, x, y), deltaY, deltaMode: 0, bubbles: true, cancelable: true }));
    },
    out() {
      if (!last) return;
      const [x, y] = last;
      send('pointerout', 'mouseout', x, y, { relatedTarget: null });
      last = null;
    },
    async drag(a, b, ms = 900, steps = 18) {
      ghost.move(a[0], a[1]);
      ghost.down(a[0], a[1]);
      for (let i = 1; i <= steps; i++) {
        await new Promise((r) => setTimeout(r, ms / steps));
        if (!isAlive()) return;
        const t = i / steps;
        send('pointermove', 'mousemove', a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, { buttons: 1 });
      }
      ghost.up(b[0], b[1]);
    },
  };
  return ghost;
}
