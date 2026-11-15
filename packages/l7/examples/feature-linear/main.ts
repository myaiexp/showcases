// Layer feature linear: a colour gradient from start to end
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [15,25],
      zoom: ctx.preview ? 0.2 : 1.2,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer()
    .source(rows('Paris', 14), PARSER)
    .size(2)
    .shape('arc')
    .color('#8C1EB2')
    .style({ sourceColor: '#f00', targetColor: '#0f0' })
    .animate({ duration: 4, interval: 0.5, trailLength: 0.8 });
  scene.addLayer(layer);

  return () => stage.dispose();
};

export default mount;
