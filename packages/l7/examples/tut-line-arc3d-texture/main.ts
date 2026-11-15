// Tutorial arc3d: a texture image repeating along the arc
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { icon } from '../../shared/images.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [20,30],
      zoom: ctx.preview ? 0.5 : 1.8,
      pitch: 55,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  await scene.addImage('plane', icon('plane'));
  const layer = new LineLayer()
    .source(rows('Singapore', 10), PARSER)
    .size(10)
    .shape('arc3d')
    .texture('plane')
    .color('#7fdbff')
    .animate({ duration: 1, interval: 0.2, trailLength: 0.1 })
    .style({ lineTexture: true, iconStep: 30 });
  scene.addLayer(layer);
  if (stage.preview) stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 40));

  return () => stage.dispose();
};

export default mount;
