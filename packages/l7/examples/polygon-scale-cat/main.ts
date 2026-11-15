// PolygonLayer scale cat: scale cat: names to colours
import { PolygonLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { regions, drift } from '../../shared/polygon-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [14, 50],
      zoom: ctx.preview ? 1.9 : 3,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new PolygonLayer()
    .source(regions())
    .shape('fill')
    .color('type', ['#ff8a65', '#4fc3f7', '#aed581'])
    .scale('type', { type: 'cat' });
  scene.addLayer(layer);
  if (stage.preview) drift(stage, scene, [14, 50]);

  return () => stage.dispose();
};

export default mount;
