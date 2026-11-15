// A Polyline through four cities, then fitBounds on its getBounds()
import { LeafletMap, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The line is an array of [lat, lng] pairs. getBounds() gives the box that fitBounds frames.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [46, 4], zoom: stage.preview ? 3 : 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const route = new Polyline(
    [
      [38.72, -9.14],
      [40.42, -3.7],
      [48.85, 2.35],
      [52.52, 13.4],
    ],
    { color: '#7cb7ff', weight: 5 },
  ).addTo(map);

  const fit = (): void => {
    map.fitBounds(route.getBounds(), { padding: [30, 30] });
  };
  const wide = (): void => {
    map.setView([46, 4], stage.preview ? 3 : 4);
  };
  stage.say('new Polyline(latlngs, { color, weight }).addTo(map)');
  stage.button('Fit to the line', fit);
  stage.button('Zoom out', wide);

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'new Polyline(latlngs, { color, weight }).addTo(map)', run: wide, hold: 2200 },
        { say: 'map.fitBounds(route.getBounds())', run: fit, hold: 2800 },
      ],
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
