// Matrix: undoing a transform
import { Leafer, Matrix } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { pin, seg, xy } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Grey point -> m.toOuterPoint -> red. Then the inverse maps red back to the green point, on top of grey.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const grey = pin(leafer, '#999', 7);
  const red = pin(leafer, '#ff4b4b', 6);
  const green = pin(leafer, '#32cd79', 3);
  const link = seg(leafer, '#ddd', 1.5, [4, 4]);
  const say = label(stage, '', true);
  const p = { x: stage.width * 0.2, y: stage.height * 0.65 };

  drive(stage, 'rotation', [0, 120, 1], 40, (deg) => {
    const m = new Matrix().translate(stage.width * 0.3, 0).rotateOfOuter({ x: stage.width / 2, y: stage.height / 2 }, deg);
    const inv = m.clone().invert();
    const out = { x: 0, y: 0 };
    const back = { x: 0, y: 0 };
    m.toOuterPoint(p, out); // writes into the second argument
    inv.toOuterPoint(out, back);
    const both = m.clone().multiply(inv); // identity
    grey.set(p);
    red.set(out, xy(out));
    green.set(back);
    link.set(p, out);
    say(`m.clone().multiply(inverse): a ${both.a.toFixed(2)} d ${both.d.toFixed(2)} e ${both.e.toFixed(1)} (identity)\nround trip ${xy(back)}`);
  }, 6);
  return stage.dispose;
};

export default mount;
