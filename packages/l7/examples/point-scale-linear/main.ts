// scale('mag', { type: 'linear', domain }): where the gradient starts and ends
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, cycle } from '../../shared/point-data.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 18 : 26)
    .color('mag', ['#3b4cc0', '#f7f7f7', '#b40426'])
    .scale('mag', { type: 'linear', domain: [1, 9] });
  scene.addLayer(layer);

  const setMax = (max: number): void => {
    layer.scale('mag', { type: 'linear', domain: [1, max] });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'domain max', [2, 9, 1], 9, setMax);
  else cycle(stage, scene, [9, 6, 3, 6], 800, setMax);

  return () => stage.dispose();
};

export default mount;
