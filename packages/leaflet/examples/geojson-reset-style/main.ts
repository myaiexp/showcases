// GeoJSON.setStyle restyles every feature at once; resetStyle puts the style option's result back
import { GeoJSON, LeafletMap, type Path } from 'leaflet';
import type { Feature } from 'geojson';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { denverSample } from '../../shared/data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Three bus-line segments styled by properties.underConstruction. setStyle overrides them all; resetStyle() restores the style option.' });
  const { freeBus } = await denverSample();
  const map = stage.own(new LeafletMap(stage.box, { center: [39.7465, -104.9935], zoom: stage.preview ? 14 : 16, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const layer = new GeoJSON(freeBus, {
    style(feature: Feature) {
      return feature.properties?.['underConstruction'] ? { color: '#f87171', dashArray: '8 8', weight: 6 } : { color: '#4ade80', weight: 6 };
    },
  }).addTo(map);

  const palette = ['#38bdf8', '#f5b83d', '#c084fc'];
  let n = 0;
  const restyle = (): void => {
    const color = palette[n++ % palette.length]!;
    layer.setStyle({ color, dashArray: '', weight: 9 });
    stage.say(`setStyle({ color: '${color}', weight: 9 }) on the whole layer`);
  };
  const byFeature = (): void => {
    layer.setStyle((feature) => ({ weight: 2 + Number(feature.properties?.['underConstruction'] ? 10 : 3), color: '#fff' }));
    stage.say('setStyle(function): a style function is called per feature, here the one under construction is thick');
  };
  const reset = (): void => {
    layer.resetStyle();
    stage.say('resetStyle(): every line is back to what the style option returns');
  };
  stage.button('setStyle({ color, weight })', restyle);
  stage.button('setStyle(function)', byFeature);
  stage.button('resetStyle()', reset);
  stage.button('resetStyle(one layer)', () => {
    const first = layer.getLayers()[0] as Path;
    restyle();
    layer.resetStyle(first);
    stage.say('resetStyle(layer) restored only the first segment');
  });
  reset();
  if (stage.preview) stage.cycle([{ run: restyle }, { run: byFeature }, { run: reset }], 1800);
  return () => stage.dispose();
};

export default mount;
