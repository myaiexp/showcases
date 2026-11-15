// A tooltip without a layer: new Tooltip(latlng, options).addTo(map), and map.openTooltip(content, latlng)
import { LeafletMap, Tooltip, type LeafletPointerEvent } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The label is a permanent Tooltip added with addTo. Click the map: map.openTooltip() shows a tooltip there until the next click.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.0, 24.0], zoom: 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // A permanent tooltip used as a map label: no layer needed.
  const label = new Tooltip([59.6, 21.5], { content: 'Baltic Sea', permanent: true, direction: 'center' }).addTo(map);

  // Not permanent, so the next click on the map closes it (its preclick), and this click opens a new one.
  map.on('click', (e: LeafletPointerEvent) => {
    map.openTooltip(`${e.latlng.lat.toFixed(2)}, ${e.latlng.lng.toFixed(2)}`, e.latlng, { direction: 'top' });
  });
  stage.button('Hide label', () => map.closeTooltip(label));
  stage.button('Show label', () => label.openOn(map));

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    stage.cycle(
      [
        { say: 'map.openTooltip(content, latlng)', run: () => g.click([60.6, 24.3]), hold: 1700 },
        { say: 'A click elsewhere replaces it', run: () => g.click([59.9, 25.6]), hold: 1700 },
        { say: 'map.closeTooltip(label)', run: () => map.closeTooltip(label), hold: 1200 },
        { say: 'label.openOn(map)', run: () => label.openOn(map), hold: 1200 },
      ],
      1000,
    );
  }
  return () => stage.dispose();
};

export default mount;
