// Scripted card gestures: double click, wheel, keys, box drag, drag and long touch
import type { LatLngExpression, LeafletMap } from 'leaflet';
import type { Ghost } from './ghost.ts';
import { STOPPED, type Stage } from './stage.ts';

export interface Gestures {
  /** A double click (shift = zoom out) at `latlng`. */
  dblclick(latlng: LatLngExpression, shift?: boolean): void;
  /** A wheel turn at `latlng`; negative `deltaY` zooms in (what scrolling up sends). */
  wheel(latlng: LatLngExpression, deltaY: number): void;
  /** Focuses the map (as Tab would) on the first call, then presses `key`. */
  key(key: string, shift?: boolean): void;
  /** Shift-drag from one point to another: the box zoom gesture. */
  boxDrag(from: LatLngExpression, to: LatLngExpression, ms?: number): Promise<void>;
  /** A drag starting at `from`, moving `by` pixels (container x, y) in `ms`, then released. */
  drag(from: LatLngExpression, by: [number, number], ms?: number): Promise<void>;
  /** A finger pressed at `latlng` for `ms` (drifting `drift` px sideways halfway), then lifted. */
  touchHold(latlng: LatLngExpression, ms?: number, drift?: number): Promise<void>;
}

// Draggable keeps one drag per page (a static), so scripted drags from every card share one lane.
let lane: Promise<unknown> = Promise.resolve();

/**
 * Cards have no pointer, so these send the same DOM events a pointer would, at the map's container.
 * Drags and presses are queued page-wide and always end with a pointerup, even when the stage is
 * disposed in the middle.
 */
export function gestures(stage: Stage, map: LeafletMap, g: Ghost): Gestures {
  const container = map.getContainer();
  let focused = false;
  stage.onDispose(() => {
    if (focused) container.dispatchEvent(new FocusEvent('blur'));
  });

  const at = (latlng: LatLngExpression): { clientX: number; clientY: number } => {
    const p = map.latLngToContainerPoint(latlng);
    const r = container.getBoundingClientRect();
    return { clientX: r.left + p.x, clientY: r.top + p.y };
  };
  const pointer = (type: string, pos: { clientX: number; clientY: number }, init: PointerEventInit = {}): void => {
    container.dispatchEvent(
      new PointerEvent(type, {
        ...pos,
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
        buttons: type === 'pointerup' ? 0 : 1,
        ...init,
      }),
    );
  };
  const queue = (job: () => Promise<void>): Promise<void> => {
    const run = lane.then(async () => {
      if (!stage.disposed) await job();
    });
    lane = run.catch(() => undefined);
    return run.catch((err: unknown) => {
      if (err !== STOPPED && !stage.disposed) throw err;
    });
  };
  const slide = async (
    start: { clientX: number; clientY: number },
    by: [number, number],
    ms: number,
    init: PointerEventInit,
    showDot: (x: number, y: number) => void,
  ): Promise<void> => {
    const steps = Math.max(4, Math.round(ms / 30));
    pointer('pointerdown', start, init);
    try {
      for (let i = 1; i <= steps; i++) {
        await stage.wait(ms / steps);
        const x = start.clientX + (by[0] * i) / steps;
        const y = start.clientY + (by[1] * i) / steps;
        pointer('pointermove', { clientX: x, clientY: y }, init);
        showDot(x, y);
      }
    } finally {
      pointer('pointerup', { clientX: start.clientX + by[0], clientY: start.clientY + by[1] }, init);
    }
  };
  const dotAt = (x: number, y: number): void => {
    const r = container.getBoundingClientRect();
    g.move(map.containerPointToLatLng([x - r.left, y - r.top]));
  };

  return {
    dblclick(latlng, shift = false) {
      const pos = at(latlng);
      g.move(latlng);
      container.dispatchEvent(new MouseEvent('dblclick', { ...pos, bubbles: true, cancelable: true, detail: 2, shiftKey: shift }));
    },
    wheel(latlng, deltaY) {
      const pos = at(latlng);
      g.move(latlng);
      container.dispatchEvent(new WheelEvent('wheel', { ...pos, deltaY, deltaMode: 0, bubbles: true, cancelable: true }));
    },
    key(key, shift = false) {
      if (!focused) {
        focused = true;
        container.dispatchEvent(new FocusEvent('focus'));
      }
      container.dispatchEvent(new KeyboardEvent('keydown', { key, shiftKey: shift, bubbles: true, cancelable: true }));
    },
    boxDrag(from, to, ms = 700) {
      return queue(async () => {
        const a = at(from);
        const b = at(to);
        g.move(from);
        await stage.wait(300);
        await slide(a, [b.clientX - a.clientX, b.clientY - a.clientY], ms, { shiftKey: true }, dotAt);
      });
    },
    drag(from, by, ms = 500) {
      return queue(async () => {
        g.move(from);
        await stage.wait(300);
        await slide(at(from), by, ms, {}, dotAt);
      });
    },
    touchHold(latlng, ms = 800, drift = 0) {
      return queue(async () => {
        const pos = at(latlng);
        g.move(latlng);
        pointer('pointerdown', pos, { pointerType: 'touch' });
        try {
          await stage.wait(ms / 2);
          if (drift) pointer('pointermove', { clientX: pos.clientX + drift, clientY: pos.clientY }, { pointerType: 'touch' });
          await stage.wait(ms / 2);
        } finally {
          pointer('pointerup', pos, { pointerType: 'touch' });
        }
      });
    },
  };
}
