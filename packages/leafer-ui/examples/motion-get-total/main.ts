// Motion: measuring a path with getMotionTotal and spacing markers by distance
import { Group, Leafer, Text, Ellipse } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { track } from '../../shared/motion-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The path is measured once; markers sit at 0, 1/4, 1/2, 3/4 and the end of that length. Stretch the wave with the slider.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const group = new Group();
  const path = track(stage);
  const dots = [0, 1, 2, 3, 4].map((i) => new Ellipse({ width: 12, height: 12, around: 'center', fill: i % 4 ? '#32cd79' : '#ff4b4b' }));
  const tags = dots.map(() => new Text({ fontSize: stage.preview ? 9 : 11, fill: '#555', text: '', around: 'bottom', hittable: false }));
  group.add([path, ...dots, ...tags]);
  leafer.add(group);
  const say = label(stage, '', true);

  const measure = (): void => {
    const total = path.getMotionTotal(); // path length in px
    dots.forEach((dot, i) => {
      dot.motion = Math.round((total * i) / 4); // a plain number is px along the path
      tags[i]!.motion = Math.round((total * i) / 4);
      tags[i]!.text = `${Math.round((total * i) / 4)}`;
      tags[i]!.motionRotation = false;
      tags[i]!.y = -14;
    });
    say(`path.getMotionTotal() = ${total.toFixed(1)}`);
  };
  drive(stage, 'amplitude', [0.6, 1.5, 0.05], 1, (k) => {
    path.scaleY = k;
    path.y = (stage.height * (1 - k)) / 2;
    measure();
  }, 5, (v) => v.toFixed(2));
  return stage.dispose;
};

export default mount;
