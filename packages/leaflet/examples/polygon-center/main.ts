// Polygon.getCenter is the area centroid, which can sit away from the bounds centre
import { CircleMarker, LeafletMap, Polygon, type LatLngExpression } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';

const SHAPES: LatLngExpression[][] = [
  [[54, 2], [54, 8], [48, 8], [48, 20], [44, 20], [44, 2]],
  [[44, 4], [54, 10], [44, 18]],
  [[46, 2], [54, 2], [54, 20], [52, 20], [52, 6], [46, 6]],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'White: getCenter(), the centroid of the polygon. Orange: the centre of getBounds().' });
  const map = stage.own(new LeafletMap(stage.box, { center: [49, 11], zoom: stage.preview ? 4 : 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const shape = new Polygon(SHAPES[0]!, { color: '#34d399', fillOpacity: 0.3 }).addTo(map);
  const centroid = new CircleMarker(shape.getCenter(), { radius: 7, color: '#ffffff', fillOpacity: 1 }).addTo(map);
  const boxCentre = new CircleMarker(shape.getBounds().getCenter(), { radius: 7, color: '#f59e0b', fillOpacity: 1 }).addTo(map);

  const use = (i: number): void => {
    shape.setLatLngs(SHAPES[i % SHAPES.length]!);
    centroid.setLatLng(shape.getCenter());
    boxCentre.setLatLng(shape.getBounds().getCenter());
    stage.say(`getCenter() ${shape.getCenter().toString()}`);
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
