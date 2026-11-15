// animate(true) on a 3D column: the columns grow from the ground
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { lattice, holder } from '../../shared/point-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 55 }),
  });
  await stage.ready(scene);

  const show = holder(scene);
  const make = () =>
    new PointLayer()
      .source(lattice(ctx.preview ? 4 : 5, 3, 4, [10, 46]), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('cylinder')
      .size('mag', (mag) => [12, 12, mag * 9])
      .color('mag', ['#2894E0', '#CFF6FF', '#FFF5B8', '#F27049'])
      .animate(true);
  show(make());

  // Growth plays once per layer: build a fresh layer to replay it.
  if (stage.bar) button(stage.bar, 'replay', () => show(make()));
  else stage.every(3500, () => show(make()));

  return () => stage.dispose();
};

export default mount;
