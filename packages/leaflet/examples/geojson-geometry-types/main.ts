// The seven GeoJSON geometry types and the Leaflet layer each one becomes
import { FeatureGroup, GeoJSON, LeafletMap, Marker, Polygon, Polyline, type LatLngBounds, type Layer } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const f = (geometry: Feature['geometry']): Feature => ({ type: 'Feature', properties: {}, geometry });
const features: Feature[] = [
  f({ type: 'Point', coordinates: [2.35, 48.85] }),
  f({ type: 'MultiPoint', coordinates: [[8.5, 47.4], [9.2, 45.5], [11.3, 44.5]] }),
  f({ type: 'LineString', coordinates: [[-3.7, 40.4], [-0.4, 39.5], [2.2, 41.4], [4.4, 43.6]] }),
  f({ type: 'MultiLineString', coordinates: [[[13.4, 52.5], [14.4, 50.1]], [[16.4, 48.2], [17.1, 48.1], [19.0, 47.5]]] }),
  f({ type: 'Polygon', coordinates: [[[-9.2, 38.7], [-8.6, 41.1], [-6.9, 41.0], [-7.2, 38.9], [-9.2, 38.7]]] }),
  f({ type: 'MultiPolygon', coordinates: [[[[21.0, 52.2], [23.0, 52.0], [22.5, 50.6], [20.8, 51.0], [21.0, 52.2]]], [[[24.0, 49.8], [25.5, 49.8], [25.2, 48.6], [24.0, 48.8], [24.0, 49.8]]]] }),
  f({ type: 'GeometryCollection', geometries: [{ type: 'Point', coordinates: [12.5, 41.9] }, { type: 'LineString', coordinates: [[12.5, 41.9], [14.3, 40.8], [15.6, 38.2]] }] }),
];

/** What Leaflet made for a feature, by instanceof (class names don't survive a build). */
function kind(layer: Layer): string {
  if (layer instanceof Marker) return 'Marker';
  if (layer instanceof Polygon) return 'Polygon (nested latlngs when Multi)';
  if (layer instanceof Polyline) return 'Polyline (nested latlngs when Multi)';
  if (layer instanceof FeatureGroup) return `FeatureGroup of ${layer.getLayers().map(kind).map((k) => k.split(' ')[0]).join(' + ')}`;
  return 'Layer';
}
const boundsOf = (layer: Layer): LatLngBounds | null => ('getBounds' in layer ? (layer as FeatureGroup).getBounds() : null);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a geometry type (or watch the cycle): the caption names the layer Leaflet built for it.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [46, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new GeoJSON(features, { style: { color: '#f5b83d', weight: 4, fillOpacity: 0.4 } }).addTo(map);
  const layers = layer.getLayers();

  const focus = (i: number): void => {
    const l = layers[i]!;
    const type = features[i]!.geometry.type;
    const box = boundsOf(l) ?? (l as Marker).getLatLng().toBounds(300_000);
    map.fitBounds(box, { padding: [40, 40], maxZoom: 6, animate: !stage.preview });
    stage.say(`${type} becomes ${kind(l)}`);
  };
  const types = features.map((x) => x.geometry.type);
  stage.select('Geometry', types.map((t, i) => ({ value: String(i), label: t })), '0', (v) => focus(Number(v)));
  stage.button('Show all', () => {
    map.fitBounds(layer.getBounds(), { padding: [20, 20] });
    stage.say('One GeoJSON layer holding all seven features');
  });
  stage.say('One GeoJSON layer holding all seven features');
  if (stage.preview) stage.cycle(layers.map((_, i) => ({ run: () => focus(i) })), 1800);
  return () => stage.dispose();
};

export default mount;
