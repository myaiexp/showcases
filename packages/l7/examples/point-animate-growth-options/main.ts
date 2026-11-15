// animate({ enable, speed, repeat }): pace and replays of the growth
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, holder } from '../../shared/point-data.ts';
import { slider, button } from '../../shared/controls.ts';
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
  const make = (speed: number, repeat: number) =>
    new PointLayer()
      .source(lattice(ctx.preview ? 4 : 5, 3, 4, [10, 46]), { parser: { type: 'json', x: 'lng', y: 'lat' } })
      .shape('squareColumn')
      .size('mag', (mag) => [12, 12, mag * 9])
      .color('mag', ['#2894E0', '#CFF6FF', '#FFF5B8', '#F27049'])
      .animate({ enable: true, speed, repeat });

  if (stage.bar) {
    let speed = 0.02;
    let repeat = 3;
    show(make(speed, repeat));
    slider(stage.bar, 'speed', [0.005, 0.05, 0.005], speed, (v) => (speed = v));
    slider(stage.bar, 'repeat', [1, 6, 1], repeat, (v) => (repeat = v));
    button(stage.bar, 'replay', () => show(make(speed, repeat)));
  } else {
    show(make(0.03, 2));
    stage.every(4000, () => show(make(0.03, 2)));
  }

  return () => stage.dispose();
};

export default mount;
