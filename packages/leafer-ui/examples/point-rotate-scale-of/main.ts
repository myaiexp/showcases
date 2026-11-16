// Point: turning and scaling a point around an origin
import { Leafer, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { pin, seg, xy } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Blue is the origin, grey the starting point, red the result. Switch the method and drag the slider.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const origin = { x: stage.width * 0.45, y: stage.height * 0.5 };
  const start = new Point(origin.x + stage.width * 0.28, origin.y - stage.height * 0.12);
  const line = seg(leafer, '#bbb', 1.5, [4, 4]);
  const from = pin(leafer, '#999', 4);
  const o = pin(leafer, '#4B8BFF', 6);
  const out = pin(leafer, '#ff4b4b', 6);
  const say = label(stage, '', true);
  o.set(origin, 'origin');
  from.set(start);

  let method: 'rotateOf' | 'scaleOf' | 'rotate (about 0, 0)' = 'rotateOf';
  let v = 0;
  const run = (): void => {
    const p = start.clone();
    let code = '';
    if (method === 'rotateOf') (p.rotateOf(origin, v), (code = `p.rotateOf(origin, ${v})`));
    else if (method === 'scaleOf') (p.scaleOf(origin, 1 + v / 90), (code = `p.scaleOf(origin, ${(1 + v / 90).toFixed(2)})`));
    else (p.rotate(v), (code = `p.rotate(${v})`));
    out.set(p, xy(p));
    line.set(origin, p);
    say(code);
  };
  pick(stage, 'method', ['rotateOf', 'scaleOf', 'rotate (about 0, 0)'] as const, (m) => ((method = m), run()), 3200);
  drive(stage, 'amount', [-90, 90, 1], 30, (n) => ((v = n), run()), 6);
  return stage.dispose;
};

export default mount;
