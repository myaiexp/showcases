// Motion: following the path direction, with an offset or not at all
import { Group, Leafer } from 'leafer-ui';
import '@leafer-in/animate'; // the animation plugin
import '@leafer-in/motion-path'; // the motion path plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { follower, track } from '../../shared/motion-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The arrow drives along the path; pick how its rotation is handled.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group();
  const arrow = follower(stage, {
    around: 'center',
    motion: 0,
    animation: { style: { motion: { type: 'percent', value: 1 } }, duration: 5, loop: true, easing: 'linear' },
  });
  group.add([track(stage), arrow]);
  leafer.add(group);
  const say = label(stage, '', true);

  const forms = { 'default (0)': 0, '45': 45, '90': 90, '180': 180, false: false } as const;
  pick(stage, 'motionRotation', Object.keys(forms) as (keyof typeof forms)[], (name) => {
    arrow.motionRotation = forms[name];
    say(`arrow.motionRotation = ${name}`);
  }, 2400);
  return stage.dispose;
};

export default mount;
