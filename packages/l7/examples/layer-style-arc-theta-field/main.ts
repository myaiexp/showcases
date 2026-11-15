// style({ thetaOffset: { field, value } }) on arcs: a curvature per route
import { LineLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, rows } from '../../shared/line-data.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';
import { EUROPE } from '../../shared/line-data.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [12, 50], zoom: ctx.preview ? 2.4 : 3.3 }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const base = rows('Paris', ctx.preview ? 9 : 14, EUROPE);
  const layer = new LineLayer()
    .source(base, PARSER)
    .shape('arc')
    .size(1.5)
    .color('#4ecdc4')
    .style({ thetaOffset: { field: 'count', value: [0.05, 0.5] }, opacity: 0.9 });
  scene.addLayer(layer);

  const set = (k: number): void => {
    layer.style({ thetaOffset: { field: 'count', value: [0.05, 0.5 * k] } });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'curvature scale', [0.2, 1.6, 0.1], 1, set);
  else stage.every(80, (i) => set(0.6 + 0.5 * Math.sin(i / 14)));

  return () => stage.dispose();
};

export default mount;
