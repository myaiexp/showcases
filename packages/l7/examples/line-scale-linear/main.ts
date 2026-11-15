// LineLayer scale type linear: how a field becomes a visual value
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
    .source(rows('Paris', 16), PARSER)
    .shape('arc')
    .size(2)
    .color('count', ['#ffe082', '#ff7043', '#b71c1c'])
    .scale('count', { type: 'linear', domain: [10, 60] });
  scene.addLayer(layer);

  // Cards have no pointer, so the map drifts to look alive.
  if (stage.preview) stage.every(80, (i) => scene.setCenter([15 + Math.sin(i / 40) * 6, 25 + Math.cos(i / 55) * 2]));

  return () => stage.dispose();
};

export default mount;
