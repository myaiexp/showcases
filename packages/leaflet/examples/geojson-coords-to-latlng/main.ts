// coordsToLatLng: read GeoJSON coordinates that are not longitude and latitude
import { GeoJSON, LatLng, LeafletMap } from 'leaflet';
import type { FeatureCollection } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

// A site plan in metres east and north of a datum: [x, y]. Not degrees.
const plan: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[[0, 0], [400, 0], [400, 250], [0, 250], [0, 0]]] } },
    { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[-200, 120], [200, 125], [600, 300]] } },
    { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [200, 125] } },
  ],
};
const DATUM = new LatLng(39.7392, -104.9903);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Metres east and north of a datum. By default the numbers are read as longitude and latitude; coordsToLatLng converts them.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [39.74, -104.99], zoom: 15, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const dflt = new GeoJSON(plan, { style: { color: '#f87171' } });
  const custom = new GeoJSON(plan, {
    style: { color: '#4ade80' },
    coordsToLatLng(coords) {
      const [x, y] = coords as [number, number];
      const lat = DATUM.lat + y / 111_320;
      const lng = DATUM.lng + x / (111_320 * Math.cos((DATUM.lat * Math.PI) / 180));
      return new LatLng(lat, lng);
    },
  });
  let current: GeoJSON | null = null;
  const show = (useCustom: boolean): void => {
    current?.remove();
    current = (useCustom ? custom : dflt).addTo(map);
    map.fitBounds(current.getBounds(), { animate: false, padding: [20, 20] });
    stage.say(useCustom ? 'coordsToLatLng converts metres to a LatLng near Denver' : 'Default: [x, y] read as [lng, lat], so a few hundred "degrees" wrap near the equator');
  };
  stage.select<'custom' | 'default'>('Coordinates read', [{ value: 'custom', label: 'with coordsToLatLng' }, { value: 'default', label: 'by default' }], 'custom', (v) => show(v === 'custom'));
  show(true);
  if (stage.preview) {
    let flip = true;
    stage.every(2600, () => show((flip = !flip)));
  }
  return () => stage.dispose();
};

export default mount;
