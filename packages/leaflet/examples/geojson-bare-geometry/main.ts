// filter and onEachFeature always receive a Feature: bare geometries are wrapped, null geometries skipped
import { GeoJSON, LeafletMap, type Layer } from 'leaflet';
import type { Feature, GeoJSON as GeoJSONData } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const STEPS: { label: string; data: GeoJSONData }[] = [
  { label: 'a bare Point geometry', data: { type: 'Point', coordinates: [-104.99, 39.75] } as GeoJSONData },
  { label: 'a Feature with a Polygon', data: { type: 'Feature', properties: { name: 'Lot' }, geometry: { type: 'Polygon', coordinates: [[[-105.0, 39.74], [-104.99, 39.74], [-104.99, 39.745], [-105.0, 39.745], [-105.0, 39.74]]] } } as GeoJSONData },
  { label: 'a Feature with geometry: null', data: { type: 'Feature', properties: { name: 'Unlocated' }, geometry: null } as unknown as GeoJSONData },
  { label: 'a bare LineString geometry', data: { type: 'LineString', coordinates: [[-105.0, 39.75], [-104.98, 39.755]] } as GeoJSONData },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button adds one object. The log shows what filter and onEachFeature were handed.' });
  const log = stage.log('callbacks', 12);
  const map = stage.own(new LeafletMap(stage.box, { center: [39.748, -104.99], zoom: 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new GeoJSON(undefined, {
    filter(feature) {
      log(`filter: type "${feature.type}", geometry ${feature.geometry.type}`);
      return true;
    },
    onEachFeature(feature: Feature, l: Layer) {
      log(`onEachFeature: layer.feature === feature: ${(l as unknown as { feature: Feature }).feature === feature}`);
    },
  }).addTo(map);

  const add = (i: number): void => {
    const step = STEPS[i]!;
    const before = layer.getLayers().length;
    layer.addData(step.data);
    const made = layer.getLayers().length - before;
    log(`-> ${step.label}: ${made ? 'layer created' : 'skipped, no callbacks'}`);
    stage.say(`addData(${step.label}): ${made ? 'a layer was created' : 'nothing was created'}`);
  };
  STEPS.forEach((s, i) => stage.button(`addData(${s.label})`, () => add(i)));
  if (stage.preview) {
    let i = 0;
    stage.every(1800, () => {
      if (i === 0) layer.clearLayers();
      add(i);
      i = (i + 1) % STEPS.length;
    });
  } else stage.say('Press a button');
  return () => stage.dispose();
};

export default mount;
