// new PointLayer({ blend }): how overlapping layers mix
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 4.2 : 5 }),
  });
  await stage.ready(scene);

  const blue = new PointLayer().source([{ lng: 9.2, lat: 46 }], { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('circle').size(ctx.preview ? 46 : 70).color('#2060ff');
  const orange = new PointLayer({ blend: 'additive' })
    .source([{ lng: 10.8, lat: 46 }], { parser: { type: 'json', x: 'lng', y: 'lat' } })
    .shape('circle')
    .size(ctx.preview ? 46 : 70)
    .color('#ff8020');
  scene.addLayer(blue);
  scene.addLayer(orange);

  const modes = ['normal', 'additive', 'subtractive', 'max'] as const;
  const set = (mode: (typeof modes)[number]): void => {
    orange.setBlend(mode);
    scene.render();
  };
  if (stage.bar) select(stage.bar, 'blend', modes, 'additive', set);
  else cycle(stage, scene, modes, 1100, set);

  return () => stage.dispose();
};

export default mount;
