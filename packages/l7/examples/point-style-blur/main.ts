// style({ blur }): soften the edge of 2D shapes
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
    .size(ctx.preview ? 24 : 32)
    .color('#ffd166')
    .style({ blur: 0.5 });
  scene.addLayer(layer);

  const set = (blur: number): void => {
    layer.style({ blur });
    scene.render();
  };
  if (stage.bar) slider(stage.bar, 'blur', [0, 1, 0.05], 0.5, set);
  else cycle(stage, scene, [0, 0.3, 0.7, 1, 0.5], 700, set);

  return () => stage.dispose();
};

export default mount;
