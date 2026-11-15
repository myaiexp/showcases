// style({ opacityLinear: { enable, dir } }): fade a column along its height
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, orbit, cycle } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 55 }),
  });
  await stage.ready(scene);

  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('hexagonColumn')
    .size('mag', (mag) => [16, 16, mag * 9])
    .color('mag', ['#2894E0', '#CFF6FF', '#FFF5B8', '#F27049'])
    .style({ opacityLinear: { enable: true, dir: 'up' } });
  scene.addLayer(layer);

  const set = (dir: 'off' | 'up' | 'down'): void => {
    layer.style({ opacityLinear: { enable: dir !== 'off', dir: dir === 'off' ? 'up' : dir } });
    scene.render();
  };
  const dirs = ['up', 'down', 'off'] as const;
  if (stage.bar) select(stage.bar, 'opacityLinear', dirs, 'up', set);
  else cycle(stage, scene, dirs, 1300, set);
  if (stage.preview) orbit(stage, scene, { pitch: 55, turn: 40 });

  return () => stage.dispose();
};

export default mount;
