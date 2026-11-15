// Tooltip direction: right, left, top, bottom, center and auto, each on its own marker
import { LeafletMap, Marker, type TooltipOptions } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

type Direction = NonNullable<TooltipOptions['direction']>;

const GRID: [Direction, number, number][] = [
  ['right', 60.25, 23.9],
  ['left', 60.25, 24.9],
  ['top', 60.25, 25.9],
  ['bottom', 59.95, 23.9],
  ['center', 59.95, 24.9],
  ['auto', 59.95, 25.9],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each marker has a permanent tooltip with its own direction. auto picks right or left by where the marker is on the map.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [60.1, 24.9], zoom: stage.preview ? 7 : 8, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  for (const [direction, lat, lng] of GRID) {
    new Marker([lat, lng]).addTo(map).bindTooltip(direction, { permanent: true, direction });
  }
  stage.say('direction: right, left, top, bottom, center, auto');

  if (stage.preview) {
    // Pan so the auto marker moves across the centre line and its tooltip flips side.
    stage.cycle([
      { run: () => map.panBy([-70, 0], { duration: 1.5 }), hold: 2200 },
      { run: () => map.panBy([70, 0], { duration: 1.5 }), hold: 2200 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
