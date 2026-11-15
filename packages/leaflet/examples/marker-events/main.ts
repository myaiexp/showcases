// Marker pointer events: over, down, click, dblclick, contextmenu, out
import { LeafletMap, Marker, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const EVENTS = ['pointerover', 'pointerdown', 'pointerup', 'preclick', 'click', 'dblclick', 'contextmenu', 'pointerout'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Hover, click, double-click and right-click the marker. Each event the layer fires is logged, in the order it fires.',
  });
  const log = stage.log('Marker events', 18);
  // Double-clicking the marker would also zoom the map, which is not what this example is about.
  const map = stage.own(new LeafletMap(stage.box, { center: [51.5, -0.09], zoom: 13, zoomControl: !stage.preview, doubleClickZoom: false }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const marker = new Marker([51.5, -0.09], { title: 'Interact with me' }).addTo(map);

  // The same listener for every interactive-layer event; each carries the pointer's latlng.
  for (const type of EVENTS) {
    marker.on(type, (e: LeafletPointerEvent) => log(`${e.type.padEnd(12)} ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`));
  }

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const icon = (): HTMLElement | null | undefined => marker.getElement();
    const at = marker.getLatLng();
    const down = (type: string): void => {
      const r = map.getContainer().getBoundingClientRect();
      const p = map.latLngToContainerPoint(at);
      icon()?.dispatchEvent(
        new PointerEvent(type, { clientX: r.left + p.x, clientY: r.top + p.y, bubbles: true, cancelable: true, pointerType: 'mouse', isPrimary: true, button: 0 }),
      );
    };
    stage.cycle(
      [
        { run: () => g.over(at, icon()) },
        { run: () => (down('pointerdown'), down('pointerup'), g.click(at, icon())), hold: 1400 },
        { run: () => (g.move(at), icon()?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true, cancelable: true, detail: 2 }))) },
        { run: () => g.contextmenu(at, icon()) },
        { run: () => g.out(icon()), hold: 1400 },
      ],
      1100,
    );
  }
  return () => stage.dispose();
};

export default mount;
