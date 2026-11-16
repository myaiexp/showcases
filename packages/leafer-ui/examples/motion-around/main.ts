// Motion: which point of the follower is pinned to the path
import { Group, Leafer, Ellipse } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import type { IAlign, IUnitPointData } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { follower, track } from '../../shared/motion-kit.ts';

const FORMS: Record<string, IAlign | IUnitPointData> = {
  "'top-left'": 'top-left',
  "'center'": 'center',
  "'bottom'": 'bottom',
  "'right'": 'right',
  "{ type: 'percent', x: 0.25, y: 0.5 }": { type: 'percent', x: 0.25, y: 0.5 },
  '{ x: 10, y: 4 } (px)': { x: 10, y: 4 },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The red dot is the path point. Watch which part of the green bar sits on it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group();
  const path = track(stage);
  const bar = follower(stage, { motion: { type: 'percent', value: 0.3 }, opacity: 0.85 });
  const pin = new Ellipse({ width: 8, height: 8, around: 'center', fill: '#ff4b4b' });
  pin.set({ motion: { type: 'percent', value: 0.3 } });
  group.add([path, bar, pin]);
  leafer.add(group);
  const say = label(stage, '', true);

  pick(stage, 'motionAround', Object.keys(FORMS), (name) => {
    bar.motionAround = FORMS[name];
    say(`bar.motionAround = ${name}`);
  }, 2000);
  return stage.dispose;
};

export default mount;
