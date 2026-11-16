// Matrix: the outer and the inner version of an "of" method
import { Leafer, Matrix, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { outlineOf, pin } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both start from the square already moved 80 px right and scaled 1.2. Blue turns about the red point in outer space, green about the same numbers in inner space.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const sq = [{ x: 0, y: 0 }, { x: 60, y: 0 }, { x: 60, y: 60 }, { x: 0, y: 60 }];
  const origin = { x: 30, y: 30 };
  const start = outlineOf(leafer, '#ccc');
  const outer = outlineOf(leafer, '#4B8BFF');
  const inner = outlineOf(leafer, '#32cd79');
  const o = pin(leafer, '#ff4b4b', 5);
  const say = label(stage, '', true);
  const base = (): Matrix => new Matrix().translate(stage.width * 0.35, 20).scale(1.2);
  start.set(sq.map((p) => new Point(p).toOuterOf(base())));
  o.set(origin, 'origin (30, 30)');

  drive(stage, 'rotation', [0, 90, 1], 40, (deg) => {
    outer.set(sq.map((p) => new Point(p).toOuterOf(base().rotateOfOuter(origin, deg))));
    inner.set(sq.map((p) => new Point(p).toOuterOf(base().rotateOfInner(origin, deg))));
    say(`rotateOfOuter(origin, ${deg})  blue\nrotateOfInner(origin, ${deg})  green`);
  }, 6);
  return stage.dispose;
};

export default mount;
