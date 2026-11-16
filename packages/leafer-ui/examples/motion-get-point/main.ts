// Motion: reading a point and a heading off the path, then placing a shape with set()
import { Group, Leafer, Ellipse } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { follower, pct, track } from '../../shared/motion-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The arrow is placed by hand: set(path.getMotionPoint(distance)), not through its own motion.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group();
  const path = track(stage);
  const arrow = follower(stage, { around: 'center' });
  const ahead = new Ellipse({ width: 9, height: 9, around: 'center', fill: '#ff4b4b' });
  group.add([path, arrow, ahead]);
  leafer.add(group);
  const say = label(stage, '', true);

  drive(stage, 'distance', [0, 100, 1], 0, (v) => {
    const total = path.getMotionTotal();
    const p = path.getMotionPoint((v / 100) * total); // { x, y, rotation }
    arrow.set(p); // x, y and rotation in one call
    ahead.set(path.getMotionPoint({ type: 'percent', value: Math.min(1, v / 100 + 0.08) })); // percent works too
    say(`x ${p.x.toFixed(0)}  y ${p.y.toFixed(0)}  rotation ${p.rotation.toFixed(0)}`);
  }, 5, pct);
  return stage.dispose;
};

export default mount;
