// dashArray sets the dash pattern; moving dashOffset makes the dashes march
import { LeafletMap, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const PATTERNS = ['10 8', '2 8', '20 6 4 6', '1 12'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'dashArray is a string such as "10 8" (dash, gap). dashOffset shifts where the pattern starts.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [47, 8], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline(
    [
      [43, -1],
      [50, 5],
      [44, 11],
      [51, 17],
    ],
    { color: '#fbbf24', weight: 4, dashArray: PATTERNS[0] },
  ).addTo(map);

  let offset = 0;
  let speed = 1;
  stage.every(40, () => {
    offset = (offset - speed) % 1000;
    line.setStyle({ dashOffset: String(offset) });
  });
  stage.select(
    'dashArray',
    PATTERNS.map((p) => ({ value: p, label: p })),
    PATTERNS[0],
    (dashArray) => line.setStyle({ dashArray }),
  );
  stage.slider('speed', -4, 4, 1, 1, (v) => (speed = v));

  let i = 0;
  if (stage.preview) {
    stage.every(2800, () => {
      i = (i + 1) % PATTERNS.length;
      line.setStyle({ dashArray: PATTERNS[i] });
    });
  }
  stage.every(200, () => stage.say(`dashArray "${line.options.dashArray}", dashOffset "${line.options.dashOffset}"`));
  return () => stage.dispose();
};

export default mount;
