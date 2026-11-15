// filter: leave features out when they are added; changing it later does not affect what is already there
import { GeoJSON, LeafletMap } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const someFeatures: Feature[] = [
  { type: 'Feature', properties: { name: 'Coors Field', show_on_map: true }, geometry: { type: 'Point', coordinates: [-104.99404, 39.75621] } },
  { type: 'Feature', properties: { name: 'Busch Field', show_on_map: false }, geometry: { type: 'Point', coordinates: [-104.98404, 39.74621] } },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Busch Field has show_on_map: false, so filter keeps it out. Flip the option and addData again: only new data is tested.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [39.751, -104.989], zoom: stage.preview ? 13 : 14, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const names = (l: GeoJSON): string => l.getLayers().map((m) => (m as unknown as { feature: Feature }).feature.properties?.['name']).join(', ') || 'nothing';
  const layer = new GeoJSON(someFeatures, {
    filter(feature) {
      return feature.properties.show_on_map;
    },
  }).addTo(map);
  layer.eachLayer((m) => m.bindTooltip((m as unknown as { feature: Feature }).feature.properties?.['name'], { permanent: true, direction: 'top' }));
  stage.say(`filter(feature) returns feature.properties.show_on_map: layer holds ${names(layer)}`);

  const addAll = (): void => {
    layer.clearLayers();
    layer.addData(someFeatures);
    layer.eachLayer((m) => m.bindTooltip((m as unknown as { feature: Feature }).feature.properties?.['name'], { permanent: true, direction: 'top' }));
    stage.say(`clearLayers() then addData() with the same filter: ${names(layer)}`);
  };
  const openFilter = (): void => {
    layer.options.filter = () => true;
    stage.say('options.filter = () => true: nothing changes yet, the existing layers are not re-tested');
  };
  stage.button('Set filter to allow all', openFilter);
  stage.button('clearLayers + addData', addAll);
  stage.button('Restore original filter', () => {
    layer.options.filter = (f) => f.properties.show_on_map;
    addAll();
  });
  if (stage.preview) {
    stage.cycle(
      [
        { run: () => (layer.options.filter = (f) => f.properties.show_on_map, addAll()), hold: 2200 },
        { run: openFilter, hold: 1600 },
        { run: addAll, hold: 2400 },
      ],
      500,
    );
  }
  return () => stage.dispose();
};

export default mount;
