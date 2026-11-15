// size([w, l, z]) as a constant, or a callback that builds it from a value
import { Scene, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice, orbit, cycle, holder } from '../../shared/point-data.ts';
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

  const data = lattice(ctx.preview ? 4 : 6, 3).map((p) => ({ ...p, unit_price: 8000 + p.mag * 7000 }));
  const make = (mode: string) => {
    const layer = new PointLayer().source(data, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('cylinder').color('#61FCBF');
    return mode === 'constant' ? layer.size([12, 12, 40]) : layer.size('unit_price', (h) => [12, 12, h / 1000]);
  };
  const show = holder(scene);
  const modes = ['constant', 'callback'];
  if (stage.bar) {
    show(make('constant'));
    select(stage.bar, 'size', modes, 'constant', (v) => show(make(v)));
  } else {
    cycle(stage, scene, modes, 1800, (v) => show(make(v)));
    orbit(stage, scene, { pitch: 55, turn: 40 });
  }

  return () => stage.dispose();
};

export default mount;
