// shape('name', 'text') with the style options the tutorial lists
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cityFeatures } from '../../shared/data.ts';
import { drift } from '../../shared/point-data.ts';
import { worldLayers } from '../../shared/world.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [15, 30], zoom: ctx.preview ? 1.3 : 1.9 }),
  });
  await stage.ready(scene);

  for (const l of worldLayers({ land: '#e8eef5', border: '#b7c3d1' })) scene.addLayer(l);
  const layer = new PointLayer()
    .source(cityFeatures())
    .shape('name', 'text')
    .size(ctx.preview ? 10 : 12)
    .color('pop', ['#0e0030', '#3a1c71', '#8e0e47'])
    .style({
      textAnchor: 'center', // the position of the text relative to its point
      textOffset: [0, 0], // [horizontal, vertical] pixels
      spacing: 2, // character spacing
      padding: [1, 1], // bounding box padding, affects collision detection
      stroke: '#ffffff', // outline color
      strokeWidth: 0.3, // outline width
    });
  scene.addLayer(layer);

  if (stage.preview) drift(stage, scene, [15, 30], 25);

  return () => stage.dispose();
};

export default mount;
