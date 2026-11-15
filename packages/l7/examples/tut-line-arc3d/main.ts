// Tutorial arc3d: change the shape and the arcs stand up
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
      center: [20,30],
      zoom: ctx.preview ? 0.5 : 1.8,
      pitch: 55,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer()
    .source(rows('Singapore', 14), PARSER)
    .size(1)
    .shape('arc3d')
    .color('#8C1EB2')
    .style({ opacity: 0.8 });
  scene.addLayer(layer);
  if (stage.preview) stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 40));

  return () => stage.dispose();
};

export default mount;
