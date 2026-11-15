// scale('delta', { type: 'diverging', neutral }): two hues meeting at a chosen value
import { PointLayer, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { PARSER, grid } from '../../shared/layer-demo.ts';
import { cycle } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.6 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(grid(ctx.preview ? 5 : 8, 4, [10, 46], 3.4), PARSER)
    .shape('circle')
    .size(ctx.preview ? 14 : 22)
    // delta runs from -50 to 50: blue below the neutral value, red above it.
    .scale('delta', { type: 'diverging', neutral: 0 })
    .color('delta', ['#2166ac', '#f7f7f7', '#b2182b']);
  scene.addLayer(layer);

  const set = (neutral: number): void => {
    layer.scale('delta', { type: 'diverging', neutral });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'neutral', [-40, 40, 5], 0, set);
  else cycle(stage, scene, [0, -30, 0, 30], 1000, set);

  return () => stage.dispose();
};

export default mount;
