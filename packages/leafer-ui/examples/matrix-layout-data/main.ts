// Matrix: friendly numbers in, friendly numbers out
import { Leafer, Matrix, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { f1, outlineOf } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Set rotation and skew: the matrix is built with setLayout() and the values come back through getLayout().' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const sq = [{ x: 0, y: 0 }, { x: 70, y: 0 }, { x: 70, y: 70 }, { x: 0, y: 70 }];
  const shape = outlineOf(leafer, '#4B8BFF', 'rgba(75,139,255,0.2)');
  const say = label(stage, '', true);

  let rotation = 20;
  let skewX = 0;
  const run = (): void => {
    const m = new Matrix().setLayout({ x: stage.width * 0.35, y: stage.height * 0.2, scaleX: 1.3, scaleY: 1, rotation, skewX, skewY: 0 });
    shape.set(sq.map((p) => new Point(p).toOuterOf(m)));
    const l = m.getLayout();
    say(`getLayout(): x ${f1(l.x)} y ${f1(l.y)} scaleX ${f1(l.scaleX)} scaleY ${f1(l.scaleY)}\n rotation ${f1(l.rotation)} skewX ${f1(l.skewX)} skewY ${f1(l.skewY)}`);
  };
  drive(stage, 'rotation', [-60, 60, 1], rotation, (v) => ((rotation = v), run()), 6);
  if (stage.bar) slider(stage.bar, 'skewX', -30, 30, 1, 0, (v) => ((skewX = v), run()));
  else stage.loop((_dt, t) => ((skewX = Math.round(Math.sin(t * 0.7) * 20)), run()));
  return stage.dispose;
};

export default mount;
