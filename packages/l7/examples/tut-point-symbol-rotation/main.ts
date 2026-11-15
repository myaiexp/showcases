// style({ rotation }) on flat symbols: a constant, a mapped field, or a callback
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { arrowImage } from '../../shared/point-demo.ts';
import { lattice, cycle, holder } from '../../shared/point-data.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4 }),
  });
  await stage.ready(scene);

  await scene.addImage('arrBlue', arrowImage('#5B8FF9'));
  await scene.addImage('arrRed', arrowImage('#ff6b6b'));
  const rotations = {
    constant: 90,
    mapped: { field: 'rotate', value: [0, 360] },
    callback: { field: 'rotate', value: (rotate: number) => rotate },
  };
  const make = (kind: keyof typeof rotations) =>
    new PointLayer({ layerType: 'fillImage' })
      .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('wind', (wind) => (wind === 'up' ? 'arrBlue' : 'arrRed'))
      .size(ctx.preview ? 24 : 34)
      .style({ rotation: rotations[kind], billboard: false });
  const show = holder(scene);
  const kinds = Object.keys(rotations) as (keyof typeof rotations)[];
  if (stage.bar) {
    show(make('constant'));
    select(stage.bar, 'rotation', kinds, 'constant', (v) => show(make(v)));
  } else cycle(stage, scene, kinds, 1500, (v) => show(make(v)));

  return () => stage.dispose();
};

export default mount;
