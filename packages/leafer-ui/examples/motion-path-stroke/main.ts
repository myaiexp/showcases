// Fun: a stroke drawn by motion, with a rider
import { Leafer, Group, Path, Rect } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The outline draws itself while the pen follows.' });
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const group = new Group({ x: stage.preview ? 24 : 100, y: stage.preview ? 20 : 100, scale: stage.preview ? 0.62 : 1 });

  const path = new Path({
    motionPath: true,
    stroke: '#32cd79',
    strokeWidth: 6,
    motion: 0,
    animation: {
      // draw the stroke to 100%
      style: { motion: { type: 'percent', value: 1 } },
      duration: 6,
      loop: true,
    },
    path: 'M20 90C20 30 100 0 150 40C200 0 280 30 280 90C280 150 150 200 150 200C150 200 20 150 20 90Z',
  });

  const pen = new Rect({
    width: 8,
    height: 30,
    cornerRadius: 4,
    fill: '#FEB027',
    around: 'bottom',
    motion: 0,
    motionRotation: 45, // turn the pen by 45 degrees along the path
    animation: {
      style: { motion: { type: 'percent', value: 1 } },
      duration: 6,
      loop: true,
    },
  });

  group.add(path);
  group.add(pen);
  leafer.add(group);

  return stage.dispose;
};

export default mount;
