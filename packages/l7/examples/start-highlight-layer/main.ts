// An empty LineLayer filled with the clicked feature through setData: an outline highlight
import { LineLayer, PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { tour } from '../../shared/layer-demo.ts';
import { regions } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 50], zoom: ctx.preview ? 2.5 : 3.3 }),
  });
  await stage.ready(scene);

  const chinaPolygonLayer = new PolygonLayer({})
    .source(regions())
    .color('name', ['rgb(239,243,255)', 'rgb(189,215,231)', 'rgb(107,174,214)', 'rgb(49,130,189)', 'rgb(8,81,156)']);
  scene.addLayer(chinaPolygonLayer);

  const hightLayer = new LineLayer({
    zIndex: 4, // Set the display level
    name: 'highlight',
  })
    .source({ type: 'FeatureCollection', features: [] })
    .shape('line')
    .size(2.5)
    .color('red');
  scene.addLayer(hightLayer);

  chinaPolygonLayer.on('click', (feature: { feature: unknown }) => {
    hightLayer.setData({ type: 'FeatureCollection', features: [feature.feature] });
  });

  if (stage.preview) tour(stage, scene, [[2.3, 46.5], [10.4, 51.1], [-3.7, 40.3], [19.1, 52], [12.5, 42.8], [25, 61.9]], { ms: 450, clickEvery: 1 });

  return () => stage.dispose();
};

export default mount;
