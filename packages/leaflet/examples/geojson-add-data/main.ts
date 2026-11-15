// An empty GeoJSON layer that grows with addData
import { GeoJSON, LeafletMap, type LatLngTuple } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const STOPS: [string, number, number][] = [
  ['Coors Field', -104.99404, 39.75621],
  ['Union Station', -105.0, 39.7529],
  ['Civic Center', -104.9903, 39.7365],
  ['City Park', -104.9496, 39.7478],
  ['Cheesman Park', -104.9666, 39.7326],
];
const feature = ([name, lng, lat]: [string, number, number]): Feature => ({
  type: 'Feature',
  properties: { name },
  geometry: { type: 'Point', coordinates: [lng, lat] },
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each press calls addData with one more feature; the layer was created empty.' });
  const center: LatLngTuple = [39.745, -104.98];
  const map = stage.own(new LeafletMap(stage.box, { center, zoom: stage.preview ? 12 : 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const myLayer = new GeoJSON().addTo(map);
  let next = 0;
  const add = (): void => {
    if (next >= STOPS.length) {
      myLayer.clearLayers();
      next = 0;
      stage.say('clearLayers() empties the layer; addData can fill it again');
      return;
    }
    const stop = STOPS[next++]!;
    myLayer.addData(feature(stop));
    stage.say(`addData(${stop[0]}): ${myLayer.getLayers().length} feature(s) in the layer`);
  };
  stage.button('addData(next feature)', add);
  stage.button('addData([the rest])', () => {
    myLayer.addData(STOPS.slice(next).map(feature));
    next = STOPS.length;
    stage.say(`addData(array): ${myLayer.getLayers().length} feature(s) in the layer`);
  });
  stage.say('new GeoJSON() with no data: empty layer');
  if (stage.preview) stage.cycle([{ run: add }], 1200);
  return () => stage.dispose();
};

export default mount;
