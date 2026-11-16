// Point: a round trip through a matrix
import { Leafer, Matrix, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cornersOf, outlineOf, pin, xy } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey: the inner space. Blue: the same square after the matrix. The point goes out (red) and comes back (green, on top of grey).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const box = { x: 24, y: stage.height * 0.35, width: 60, height: 60 };
  const before = outlineOf(leafer, '#bbb');
  const after = outlineOf(leafer, '#4B8BFF');
  const inner = pin(leafer, '#999', 6);
  const outer = pin(leafer, '#ff4b4b', 6);
  const back = pin(leafer, '#32cd79', 3);
  const say = label(stage, '', true);
  before.set(cornersOf(box));
  const c = { x: box.x + 30, y: box.y + 30 };

  drive(stage, 'rotation', [0, 60, 1], 20, (deg) => {
    const m = new Matrix().scaleOfOuter(c, 1.4).rotateOfOuter(c, deg).translate(stage.width * 0.45, -10);
    const p = new Point(box.x + 45, box.y + 12);
    const out = p.clone().toOuterOf(m);
    const again = out.clone().toInnerOf(m);
    after.set(cornersOf(box).map((corner) => new Point(corner).toOuterOf(m)));
    inner.set(p);
    outer.set(out, xy(out));
    back.set(again);
    say(`p.toOuterOf(m) -> ${xy(out)}   then .toInnerOf(m) -> ${xy(again)}`);
  }, 6);
  return stage.dispose;
};

export default mount;
