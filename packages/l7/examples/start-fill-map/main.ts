// new PolygonLayer().source(geojson).color('name', blues): the quick start's fill map
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { drift } from '../../shared/point-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  // Stands in for the docs' fetched China provinces GeoJSON.
  const chinaPolygonLayer = new PolygonLayer({})
    .source(regions())
    .color('name', ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)']);
  scene.addLayer(chinaPolygonLayer);

  if (stage.preview) drift(stage, scene, [15, 50], 4);

  return () => stage.dispose();
};

export default mount;
