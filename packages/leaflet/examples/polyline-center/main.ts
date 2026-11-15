// Polyline.getCenter is the midpoint along the line, not the middle of its bounds
import { CircleMarker, LeafletMap, Polyline, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const SHAPES: LatLngExpression[][] = [
  [[44, 0], [53, 3], [53, 6], [51, 22]],
  [[43, 2], [50, 6], [43, 9], [44, 21]],
  [[54, 4], [54, 6], [54, 8], [45, 9], [44, 20]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'White: getCenter(), half the length along the line. Orange: the centre of getBounds().' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48, 11], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const line = new Polyline(SHAPES[0]!, { color: '#7cb7ff', weight: 4 }).addTo(map);
  const centre = new CircleMarker(line.getCenter(), { radius: 7, color: '#ffffff', fillOpacity: 1 }).addTo(map);
  const boxCentre = new CircleMarker(line.getBounds().getCenter(), { radius: 7, color: '#f59e0b', fillOpacity: 1 }).addTo(map);

  const use = (i: number): void => {
    line.setLatLngs(SHAPES[i % SHAPES.length]!);
    centre.setLatLng(line.getCenter());
    boxCentre.setLatLng(line.getBounds().getCenter());
    stage.say(`getCenter() ${line.getCenter().toString()}`);
  };
  SHAPES.forEach((_, i) => stage.button(`Shape ${i + 1}`, () => use(i)));
  let i = 0;
  use(0);
  if (stage.preview) {
    stage.every(2400, () => use(++i));
  }
  return () => stage.dispose();
};

export default mount;
