// LineLayer shape arc3d: arcs that rise off the map, seen with pitch
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
    .source(rows('Dubai', 14), PARSER)
    .shape('arc3d')
    .size(3)
    .color('#4fc3f7')
    .animate({ duration: 3, interval: 0.3, trailLength: 0.4 });
  scene.addLayer(layer);
  if (stage.preview) stage.frame((t) => scene.setRotation(Math.sin(t / 2.5) * 40));

  return () => stage.dispose();
};

export default mount;
