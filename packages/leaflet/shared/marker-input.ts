// Scripted card input for markers: drag an icon or press keys on it
import type { LeafletMap, Marker } from 'leaflet';
import type { Ghost } from './ghost.ts';
import { inDragLane } from './drag-lane.ts';
import { STOPPED, type Stage } from './stage.ts';

export interface MarkerInput {
  /** Presses the pointer on `marker`'s icon, drags it by `by` pixels over `ms`, and releases. */
  drag(marker: Marker, by: [number, number], ms?: number): Promise<void>;
  /** Sends focusin, then keydown/keyup for `key` to the marker's icon (what Tab then the key sends). */
  key(marker: Marker, key: string, opts?: { shift?: boolean; hold?: number }): Promise<void>;
  /** Releases focus the way Tab-ing away does. */
  blur(marker: Marker): void;
}


/**
 * Marker dragging listens on the marker's own icon element, so these events go there (the map
 * container is what `gestures()` targets). Drags always end with a pointerup, even if the stage is
 * disposed in the middle.
 */
export function markerInput(stage: Stage, map: LeafletMap, g: Ghost): MarkerInput {
  const pointer = (icon: Element, type: string, x: number, y: number): void => {
    icon.dispatchEvent(
      new PointerEvent(type, {
        clientX: x,
        clientY: y,
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerType: 'mouse',
        isPrimary: true,
        button: 0,
        buttons: type === 'pointerup' ? 0 : 1,
      }),
    );
  };
  const centre = (marker: Marker): { x: number; y: number } => {
    const p = map.latLngToContainerPoint(marker.getLatLng());
    const r = map.getContainer().getBoundingClientRect();
    return { x: r.left + p.x, y: r.top + p.y };
  };
  return {
    drag(marker, by, ms = 700) {
      const run = inDragLane(async () => {
        const icon = marker.getElement();
        if (stage.disposed || !icon) return;
        const from = centre(marker);
        g.move(marker.getLatLng());
        await stage.wait(300);
        const r = map.getContainer().getBoundingClientRect();
        pointer(icon, 'pointerdown', from.x, from.y);
        const steps = Math.max(4, Math.round(ms / 30));
        try {
          for (let i = 1; i <= steps; i++) {
            await stage.wait(ms / steps);
            const x = from.x + (by[0] * i) / steps;
            const y = from.y + (by[1] * i) / steps;
            pointer(icon, 'pointermove', x, y);
            g.move(map.containerPointToLatLng([x - r.left, y - r.top]));
          }
        } finally {
          pointer(icon, 'pointerup', from.x + by[0], from.y + by[1]);
        }
      });
      return run.catch((err: unknown) => {
        if (err !== STOPPED && !stage.disposed) throw err;
      });
    },
    async key(marker, key, opts = {}) {
      const icon = marker.getElement();
      if (!icon) return;
      icon.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
      const init = { key, shiftKey: opts.shift ?? false, bubbles: true, cancelable: true };
      icon.dispatchEvent(new KeyboardEvent('keydown', init));
      if (opts.hold) await stage.wait(opts.hold);
      icon.dispatchEvent(new KeyboardEvent('keyup', init));
    },
    blur(marker) {
      const icon = marker.getElement();
      icon?.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      icon?.dispatchEvent(new FocusEvent('blur'));
    },
  };
}
