// Fake pointer for cards: real DOM pointer events at map points, with a visible dot
import type { LatLngExpression, LeafletMap } from 'leaflet';

export interface Ghost {
  /** Moves the dot to `latlng` and fires pointermove there (on `target`, default the map container). */
  move(latlng: LatLngExpression, target?: Element | null): void;
  /** pointerover + pointermove on `target` (a path's or marker's element) at `latlng`. */
  over(latlng: LatLngExpression, target: Element | null | undefined): void;
  /** pointerout on `target`. */
  out(target: Element | null | undefined): void;
  /** A click at `latlng` on `target` (default the map container): what a tap or mouse click sends. */
  click(latlng: LatLngExpression, target?: Element | null): void;
  /** contextmenu (right click / long press) at `latlng`. */
  contextmenu(latlng: LatLngExpression, target?: Element | null): void;
  hide(): void;
  remove(): void;
}

/**
 * Cards have `pointer-events: none`, so nothing real ever reaches the map. These are the same
 * DOM events a pointer would send, dispatched straight at the elements Leaflet listens on, so the
 * map's own event handling (finding the layer, firing `click`, `pointerover`…) runs unchanged.
 */
export function ghost(map: LeafletMap): Ghost {
  const container = map.getContainer();
  const dot = document.createElement('div');
  dot.style.cssText =
    'position:absolute;z-index:900;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;' +
    'background:rgb(255 255 255 / 0.85);box-shadow:0 0 0 2px rgb(0 0 0 / 0.45);pointer-events:none;' +
    'transition:left 0.45s ease, top 0.45s ease, transform 0.15s;display:none';
  container.append(dot);

  const client = (latlng: LatLngExpression): { clientX: number; clientY: number } => {
    const p = map.latLngToContainerPoint(latlng);
    const r = container.getBoundingClientRect();
    dot.style.display = 'block';
    dot.style.left = `${p.x}px`;
    dot.style.top = `${p.y}px`;
    return { clientX: r.left + p.x, clientY: r.top + p.y };
  };
  const pointer = (type: string, target: Element, at: { clientX: number; clientY: number }): void => {
    target.dispatchEvent(
      new PointerEvent(type, { ...at, bubbles: true, cancelable: true, composed: true, pointerType: 'mouse', isPrimary: true }),
    );
  };

  return {
    move(latlng, target) {
      pointer('pointermove', target ?? container, client(latlng));
    },
    over(latlng, target) {
      const at = client(latlng);
      if (!target) return;
      pointer('pointerover', target, at);
      pointer('pointermove', target, at);
    },
    out(target) {
      if (target) pointer('pointerout', target, { clientX: 0, clientY: 0 });
    },
    click(latlng, target) {
      const at = client(latlng);
      dot.style.transform = 'scale(0.6)';
      setTimeout(() => (dot.style.transform = ''), 160);
      (target ?? container).dispatchEvent(new MouseEvent('click', { ...at, bubbles: true, cancelable: true, detail: 1 }));
    },
    contextmenu(latlng, target) {
      const at = client(latlng);
      (target ?? container).dispatchEvent(new MouseEvent('contextmenu', { ...at, bubbles: true, cancelable: true, button: 2 }));
    },
    hide() {
      dot.style.display = 'none';
    },
    remove() {
      dot.remove();
    },
  };
}
