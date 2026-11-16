// Bounds: corners and anchor points, before and after a rotation
import { Bounds, Leafer, Matrix } from 'leafer-ui';
import type { IAlign } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { cornersOf, outlineOf, pin, xy } from '../../shared/math-kit.ts';

const ALIGNS: IAlign[] = ['top-left', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'center'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blue outline is the box turned by the slider. The red dot is its getPoint(around) anchor.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const b = new Bounds(stage.width * 0.3, stage.height * 0.3, stage.width * 0.4, stage.height * 0.22);
  const flat = outlineOf(leafer, '#ccc');
  const turned = outlineOf(leafer, '#4B8BFF');
  const corners = [0, 1, 2, 3].map(() => pin(leafer, '#4B8BFF', 3));
  const anchor = pin(leafer, '#ff4b4b', 6);
  const say = label(stage, '', true);
  flat.set(cornersOf(b));

  let around: IAlign = 'top-left';
  let deg = 25;
  const run = (): void => {
    const m = new Matrix().rotateOfOuter(b.getPoint('center'), deg);
    const pts = b.getPoints().map((p) => ({ ...p })).map((p) => ({ x: m.a * p.x + m.c * p.y + m.e, y: m.b * p.x + m.d * p.y + m.f }));
    turned.set(pts);
    corners.forEach((c, i) => c.set(pts[i]!));
    const p = b.getPoint(around);
    const q = { x: m.a * p.x + m.c * p.y + m.e, y: m.b * p.x + m.d * p.y + m.f };
    anchor.set(q, around);
    say(`b.getPoint('${around}') = ${xy(p)}   rotated ${xy(q)}`);
  };
  pick(stage, 'around', ALIGNS, (a) => ((around = a), run()), 1400);
  drive(stage, 'rotation', [0, 90, 1], 25, (v) => ((deg = v), run()), 6);
  return stage.dispose;
};

export default mount;
