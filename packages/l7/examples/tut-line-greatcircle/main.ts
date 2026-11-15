// Tutorial greatcircle: the shortest line between two points
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { PARSER, rows, NO_DATELINE } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({
      center: [10,35],
      zoom: ctx.preview ? 0.3 : 1.5,
    }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const layer = new LineLayer()
    .source(rows('Paris', 14, NO_DATELINE), PARSER)
    .size(1)
    .shape('greatcircle')
    .color('#8C1EB2')
    .style({ opacity: 0.8 });
  scene.addLayer(layer);

  // Cards have no pointer, so the map drifts to look alive.
  if (stage.preview) stage.every(80, (i) => scene.setCenter([10 + Math.sin(i / 40) * 6, 35 + Math.cos(i / 55) * 2]));

  return () => stage.dispose();
};

export default mount;
