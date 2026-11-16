// Matrix: child-first or parent-first composition
import { Leafer, Matrix, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { outlineOf } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'a rotates, b moves right and scales. Blue is a.multiply(b), green is a.multiplyParent(b).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const sq = [{ x: 0, y: 0 }, { x: 50, y: 0 }, { x: 50, y: 50 }, { x: 0, y: 50 }];
  const blue = outlineOf(leafer, '#4B8BFF', 'rgba(75,139,255,0.2)');
  const green = outlineOf(leafer, '#32cd79', 'rgba(50,205,121,0.2)');
  const say = label(stage, '', true);
  const base = { x: stage.width * 0.15, y: stage.height * 0.5 };

  drive(stage, 'a rotation', [0, 90, 1], 35, (deg) => {
    const a = new Matrix().rotate(deg);
    const b = new Matrix().translate(stage.width * 0.3, 0).scale(1.3);
    blue.set(sq.map((p) => new Point(p).toOuterOf(a.clone().multiply(b)).move(base)));
    green.set(sq.map((p) => new Point(p).toOuterOf(a.clone().multiplyParent(b)).move(base)));
    say('a.clone().multiply(b)         blue\na.clone().multiplyParent(b)   green');
  }, 6);
  return stage.dispose;
};

export default mount;
