// Fun: an element following a motionPath
import { Leafer, Group, Path, Polygon } from 'leafer-ui';
import '@leafer-in/motion-path'; // the motion path plugin
import '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The car drives along the green hill.' });
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const group = new Group({ scale: stage.preview ? 0.42 : 1, x: stage.preview ? 10 : 100, y: stage.preview ? 40 : 100 });

  const path = new Polygon({
    motionPath: true, // the road: siblings can move along it
    points: [0, 90, 100, 60, 200, 80, 300, 40, 375, 50, 450, 10, 550, 90, 550, 90, 0, 90],
    curve: true,
    fill: '#32cd79',
  });

  const car = new Path({
    scale: 1,
    fill: '#FEB027',
    around: 'bottom',
    path: 'M0 30L6 14Q8 10 14 10L40 10Q46 10 50 16L58 30Z M14 30a6 6 0 1 0 0.01 0 M46 30a6 6 0 1 0 0.01 0',
    motion: 0,
    animation: {
      // drive to 100% of the path
      style: { motion: { type: 'percent', value: 1 } },
      duration: 9,
      loop: true,
    },
  });

  group.add(path);
  group.add(car);
  leafer.add(group);

  return stage.dispose;
};

export default mount;
