// style({ billboard: false }): flat symbols that can rotate and scale freely
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { icon } from '../../shared/images.ts';
import { lattice, cycle, holder } from '../../shared/point-data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3 : 3.4, pitch: 50 }),
  });
  await stage.ready(scene);

  await scene.addImage('00', icon('house'));
  await scene.addImage('01', icon('tree'));
  await scene.addImage('02', icon('pin'));
  const make = (flat: boolean) => {
    const layer = flat ? new PointLayer({ layerType: 'fillImage' }) : new PointLayer();
    return layer
      .source(lattice(ctx.preview ? 4 : 6, 3), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('type', ['00', '01', '02'])
      .size(ctx.preview ? 24 : 36)
      .style(flat ? { rotation: 0, billboard: false } : {});
  };
  const show = holder(scene);
  if (stage.bar) {
    show(make(true));
    toggle(stage.bar, 'billboard: false (flat)', true, (flat) => show(make(flat)));
  } else {
    cycle(stage, scene, [true, false], 2000, (flat) => show(make(flat)));
    stage.every(60, (i) => scene.setRotation(Math.sin(i / 30) * 25));
  }

  return () => stage.dispose();
};

export default mount;
