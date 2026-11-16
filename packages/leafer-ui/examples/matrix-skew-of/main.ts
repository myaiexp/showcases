// Matrix: shearing about the origin or about a chosen point
import { Leafer, Matrix, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { outlineOf, pin } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey: the square. Red: skew(x) about (0, 0), so it also drifts. Blue: skewOfOuter about the red dot, which stays put.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const sq = [{ x: 0, y: 0 }, { x: 70, y: 0 }, { x: 70, y: 70 }, { x: 0, y: 70 }];
  const at = new Matrix().translate(stage.width * 0.35, stage.height * 0.2);
  outlineOf(leafer, '#bbb').set(sq.map((p) => new Point(p).toOuterOf(at)));
  const red = outlineOf(leafer, '#ff4b4b');
  const blue = outlineOf(leafer, '#4B8BFF');
  const origin = { x: stage.width * 0.35 + 35, y: stage.height * 0.2 + 70 }; // bottom middle of the square
  pin(leafer, '#ff4b4b', 4).set(origin);
  const say = label(stage, '', true);

  drive(stage, 'skewX', [-40, 40, 1], 25, (k) => {
    red.set(sq.map((p) => new Point(p).toOuterOf(at.clone().skew(k))));
    blue.set(sq.map((p) => new Point(p).toOuterOf(at.clone().skewOfOuter(origin, k))));
    say(`skew(${k})  red     skewOfOuter(origin, ${k})  blue`);
  }, 6);
  return stage.dispose;
};

export default mount;
