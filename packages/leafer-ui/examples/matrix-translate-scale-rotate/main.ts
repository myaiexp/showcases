// Matrix: a chain of transforms and the numbers it produces
import { Leafer, Matrix, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { f1, outlineOf } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The unit square (grey, 50 px) is transformed by the chain. The same calls in another order land somewhere else.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const sq = [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 50 }, { x: 0, y: 50 }];
  const base = outlineOf(leafer, '#bbb');
  const out = outlineOf(leafer, '#4B8BFF', 'rgba(75,139,255,0.2)');
  const say = label(stage, '', true);
  base.set(sq);

  let order: 'translate, scale, rotate' | 'rotate, scale, translate' = 'translate, scale, rotate';
  let deg = 30;
  const run = (): void => {
    const dx = stage.width * 0.35;
    const m = new Matrix();
    if (order === 'translate, scale, rotate') m.translate(dx, 30).scale(1.5).rotate(deg);
    else m.rotate(deg).scale(1.5).translate(dx, 30);
    out.set(sq.map((p) => new Point(p).toOuterOf(m)));
    const d = m.get();
    say(`${order}\n a ${f1(d.a)}  b ${f1(d.b)}  c ${f1(d.c)}  d ${f1(d.d)}  e ${f1(d.e)}  f ${f1(d.f)}`);
  };
  pick(stage, 'chain', ['translate, scale, rotate', 'rotate, scale, translate'] as const, (o) => ((order = o), run()), 3600);
  drive(stage, 'rotation', [0, 90, 1], 30, (v) => ((deg = v), run()), 6);
  return stage.dispose;
};

export default mount;
