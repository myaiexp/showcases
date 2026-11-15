// new GeoJSON() takes a Feature, a bare geometry, an array of objects or a FeatureCollection
import { GeoJSON, LeafletMap } from 'leaflet';
import type { GeoJSON as GeoJSONData } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const geojsonFeature: GeoJSONData = {
  type: 'Feature',
  properties: { name: 'Coors Field', amenity: 'Baseball Stadium', popupContent: 'This is where the Rockies play!' },
  geometry: { type: 'Point', coordinates: [-104.99404, 39.75621] },
} as GeoJSONData;

const myLines: GeoJSONData[] = [
  { type: 'LineString', coordinates: [[-100, 40], [-105, 45], [-110, 55]] } as GeoJSONData,
  { type: 'LineString', coordinates: [[-105, 40], [-110, 45], [-115, 55]] } as GeoJSONData,
];

type Form = 'feature' | 'geometry' | 'array' | 'collection';
const FORMS: Record<Form, { label: string; data: () => GeoJSONData | GeoJSONData[]; view: [number, number, number] }> = {
  feature: { label: 'A Feature (a Point with properties)', data: () => geojsonFeature, view: [39.75, -104.99, 13] },
  geometry: { label: 'A bare geometry (a Point, no properties)', data: () => ({ type: 'Point', coordinates: [-104.99404, 39.75621] }) as GeoJSONData, view: [39.75, -104.99, 13] },
  array: { label: 'An array of two LineStrings', data: () => myLines, view: [47, -108, 4] },
  collection: { label: 'A FeatureCollection', data: () => ({ type: 'FeatureCollection', features: [geojsonFeature, ...myLines.map((g) => ({ type: 'Feature', properties: {}, geometry: g }))] }) as GeoJSONData, view: [44, -106, 4] },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same constructor accepts each form; Leaflet draws a marker for a Point and a polyline for a LineString.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [44, -106], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let layer: GeoJSON | null = null;
  const show = (form: Form): void => {
    layer?.remove();
    const { label, data, view } = FORMS[form];
    layer = new GeoJSON(data()).addTo(map);
    map.setView([view[0], view[1]], view[2], { animate: false });
    stage.say(`new GeoJSON(${label.toLowerCase()}).addTo(map)`);
  };
  stage.select<Form>('Input', (Object.keys(FORMS) as Form[]).map((value) => ({ value, label: FORMS[value].label })), 'feature', show);
  show('feature');

  if (stage.preview) {
    const order: Form[] = ['feature', 'geometry', 'array', 'collection'];
    stage.cycle(order.map((f) => ({ run: () => show(f) })), 2200);
  }
  return () => stage.dispose();
};

export default mount;
