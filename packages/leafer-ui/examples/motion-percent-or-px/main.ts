// Motion: placing an element along a path in pixels or in percent
import { Group, Leafer } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { follower, pct, track } from '../../shared/motion-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide along the path. Percent mode writes a fraction, px mode a distance from the start.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group();
  const path = track(stage);
  const dot = follower(stage, { around: 'center' });
  group.add([path, dot]);
  leafer.add(group);
  const say = label(stage, '', true);

  let unit: 'percent' | 'px' = 'percent';
  let at = 0;
  const place = (): void => {
    if (unit === 'percent') {
      dot.motion = { type: 'percent', value: at / 100 };
      say(`dot.motion = { type: 'percent', value: ${(at / 100).toFixed(2)} }`);
    } else {
      const px = Math.round((at / 100) * path.getMotionTotal());
      dot.motion = px;
      say(`dot.motion = ${px}   // of ${Math.round(path.getMotionTotal())} px`);
    }
  };
  pick(stage, 'unit', ['percent', 'px'] as const, (u) => ((unit = u), place()), 2600);
  drive(stage, 'position', [0, 100, 1], 0, (v) => ((at = v), place()), 5, pct);
  return stage.dispose;
};

export default mount;
