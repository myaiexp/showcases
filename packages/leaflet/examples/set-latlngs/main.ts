// setLatLngs swaps every point of a Polyline; isEmpty tells when none are left
import { LeafletMap, Polyline, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const ROUTES: { name: string; points: LatLngExpression[] }[] = [
  { name: 'west to east', points: [[40, -4], [44, 2], [47, 8], [50, 14], [52, 20]] },
  { name: 'a loop', points: [[44, 4], [50, 4], [50, 14], [44, 14], [44, 4]] },
  { name: 'a zigzag', points: [[52, 2], [46, 6], [52, 10], [46, 14], [52, 18]] },
  { name: 'no points', points: [] },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'setLatLngs replaces the whole array and redraws. With an empty array nothing is drawn and isEmpty() is true.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [47, 9], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline(ROUTES[0]!.points, { color: '#a78bfa', weight: 4 }).addTo(map);
  const use = (i: number): void => {
    const r = ROUTES[i % ROUTES.length]!;
    line.setLatLngs(r.points);
    stage.say(`setLatLngs(${r.name}): isEmpty() ${line.isEmpty()}`);
  };
  ROUTES.forEach((r, i) => stage.button(r.name, () => use(i)));
  let i = 0;
  use(0);
  if (stage.preview) {
    stage.every(2000, () => use(++i));
  }
  return () => stage.dispose();
};

export default mount;
