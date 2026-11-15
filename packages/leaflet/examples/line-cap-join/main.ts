// lineCap and lineJoin on a thick line, with the real path drawn thin on top
import { LeafletMap, Polyline } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const CAPS = ['butt', 'round', 'square'] as const;
const JOINS = ['miter', 'round', 'bevel'] as const;
const POINTS: [number, number][] = [
  [48, 4],
  [52, 10],
  [48, 16],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'lineCap shapes the two ends, lineJoin the corner. The thin white line is the same polyline at weight 1.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [50, 10], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const thick = new Polyline(POINTS, { color: '#7cb7ff', weight: 30, opacity: 0.8 }).addTo(map);
  new Polyline(POINTS, { color: '#ffffff', weight: 1, interactive: false }).addTo(map);

  const apply = (lineCap: (typeof CAPS)[number], lineJoin: (typeof JOINS)[number]): void => {
    thick.setStyle({ lineCap, lineJoin });
    stage.say(`lineCap: ${lineCap}, lineJoin: ${lineJoin}`);
  };
  let cap: (typeof CAPS)[number] = 'butt';
  let join: (typeof JOINS)[number] = 'miter';
  stage.select('lineCap', CAPS.map((v) => ({ value: v, label: v })), cap, (v) => apply((cap = v), join));
  stage.select('lineJoin', JOINS.map((v) => ({ value: v, label: v })), join, (v) => apply(cap, (join = v)));

  let i = 0;
  apply(CAPS[0], JOINS[0]);
  if (stage.preview) {
    stage.every(1800, () => {
      i++;
      apply(CAPS[i % 3]!, JOINS[i % 3]!);
    });
  }
  return () => stage.dispose();
};

export default mount;
