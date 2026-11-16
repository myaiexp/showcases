// Point: a point at a set distance along a line
import { Leafer, Point } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, toggle } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { pin, seg, xy } from '../../shared/math-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Walk along the line from the blue point toward the green one. "fromTo" counts the distance from the green end instead.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const a = new Point(stage.width * 0.15, stage.height * 0.7);
  const b = new Point(stage.width * 0.82, stage.height * 0.3);
  const line = seg(leafer, '#bbb', 2);
  const pa = pin(leafer, '#4B8BFF', 6);
  const pb = pin(leafer, '#32cd79', 6);
  const hit = pin(leafer, '#ff4b4b', 6);
  const say = label(stage, '', true);
  line.set(a, b);
  pa.set(a, 'a');
  pb.set(b, 'b');

  let fromTo = false;
  let distance = 0;
  const run = (): void => {
    const p = a.getDistancePoint(b, distance, false, fromTo);
    hit.set(p, xy(p));
    say(`a.getDistancePoint(b, ${distance}, false, ${fromTo})   a.getDistance(b) = ${a.getDistance(b).toFixed(0)}`);
  };
  toggle(stage, 'fromTo', false, (v) => ((fromTo = v), run()), 3600);
  drive(stage, 'distance', [0, 300, 2], 80, (n) => ((distance = n), run()), 6);
  return stage.dispose;
};

export default mount;
