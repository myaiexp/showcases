// GeoJSON.geometryToLayer builds a layer from one GeoJSON object without a GeoJSON group
import { CircleMarker, FeatureGroup, GeoJSON, LeafletMap, Marker, Polygon, Polyline, type Layer } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const SAMPLES: Record<string, Feature> = {
  Point: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [2.35, 48.85] } },
  Polygon: { type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[[1, 47], [4, 47.5], [3.5, 49.5], [0.8, 49], [1, 47]]] } },
  FeatureCollection: {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [2.35, 48.85] } },
      { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [[0.5, 47], [2.35, 48.85], [4.5, 49.5]] } },
    ],
  } as unknown as Feature,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'geometryToLayer(geojson, options) returns the layer; you add it yourself. Its options are the GeoJSON options, so pointToLayer works.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48.3, 2.4], zoom: 6, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let made: Layer | null = null;
  const build = (name: string): void => {
    made?.remove();
    const layer = GeoJSON.geometryToLayer(SAMPLES[name]!, {
      pointToLayer: (_feature, latlng) => new CircleMarker(latlng, { radius: 9, color: '#fff', fillColor: '#38bdf8', fillOpacity: 0.9 }),
      color: '#f5b83d',
    } as Parameters<typeof GeoJSON.geometryToLayer>[1]);
    if (!layer) return;
    made = layer.addTo(map);
    const what = layer instanceof CircleMarker ? 'CircleMarker (from pointToLayer)' : layer instanceof Marker ? 'Marker' : layer instanceof Polygon ? 'Polygon' : layer instanceof Polyline ? 'Polyline' : layer instanceof FeatureGroup ? 'FeatureGroup of the members' : 'Layer';
    stage.say(`geometryToLayer(${name}) returned a ${what}; layer.feature is ${(layer as unknown as { feature?: Feature }).feature ? 'set' : 'undefined (only GeoJSON.addData sets it)'}`);
  };
  stage.select('Object', Object.keys(SAMPLES).map((v) => ({ value: v, label: v })), 'Point', build);
  build('Point');
  if (stage.preview) {
    const names = Object.keys(SAMPLES);
    let i = 0;
    stage.every(2000, () => build(names[++i % names.length]!));
  }
  return () => stage.dispose();
};

export default mount;
