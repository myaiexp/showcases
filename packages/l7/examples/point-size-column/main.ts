// size([w, l, h]) and size([w, h]) on a 3D column
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

  const sizes = {
    '[10, 70]': [10, 70],
    '[10, 10, 70]': [10, 10, 70],
    '[8, 26, 50]': [8, 26, 50],
    '[26, 8, 50]': [26, 8, 50],
  } as const;
  type Key = keyof typeof sizes;
  const layer = new PointLayer()
    .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('squareColumn')
    .size([...sizes['[10, 70]']])
    .color('#4ecdc4');
  scene.addLayer(layer);

  const set = (key: Key): void => {
    layer.size([...sizes[key]]);
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'size', Object.keys(sizes) as Key[], '[10, 70]', set);
  else cycle(stage, scene, Object.keys(sizes) as Key[], 1100, set);
  if (stage.preview) orbit(stage, scene, { pitch: 55, turn: 35 });

  return () => stage.dispose();
};

export default mount;
