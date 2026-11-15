// contextmenu, dblclick and preclick on the map, logged in firing order
import { LeafletMap, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click, double-click and right-click the map. A click logs preclick first; a double-click also zooms in.' });
  const log = stage.log('Events', 12);

  const map = stage.own(new LeafletMap(stage.box).setView([52.52, 13.4], 9));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  for (const type of ['preclick', 'click', 'dblclick', 'contextmenu'] as const) {
    map.on(type, (e: LeafletPointerEvent) => log(`${type} at ${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`));
  }

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    // The ghost has no double click, so send the DOM event it would send.
    const dbl = (ll: [number, number]): void => {
      g.move(ll);
      const p = map.latLngToContainerPoint(ll);
      const r = map.getContainer().getBoundingClientRect();
      map.getContainer().dispatchEvent(
        new MouseEvent('dblclick', { clientX: r.left + p.x, clientY: r.top + p.y, bubbles: true, cancelable: true, detail: 2 }),
      );
    };
    stage.cycle(
      [
        { run: () => g.click([52.6, 13.2]) },
        { run: () => g.contextmenu([52.45, 13.6]) },
        { run: () => dbl([52.52, 13.4]), hold: 2400 },
        { run: () => map.setView([52.52, 13.4], 9, { animate: false }) },
      ],
      1700,
    );
  }
  return () => stage.dispose();
};

export default mount;
