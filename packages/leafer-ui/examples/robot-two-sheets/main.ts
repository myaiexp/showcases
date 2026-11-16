// Robot: a list of sheets makes one frame sequence
import { Leafer } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin: sprite-sheet game elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { arrowSheet } from '../../shared/sprites.ts'; // the docs' arrows.png, painted in code: 20 frames of 100 x 100
import { pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Both actions read from one numbered sequence." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const scale = stage.preview ? 0.8 : 1.4; // frames are 100 x 100

  const robot = new Robot({
    x: (stage.width - 100 * scale) / 2,
    y: (stage.height - 100 * scale) / 2,
    scale,
    robot: [
      { url: arrowSheet(), offset: { x: 0, y: 0 }, size: 100, total: 5 }, // frames 0-4: up
      { url: arrowSheet(), offset: { x: 0, y: 200 }, size: 100, total: 5 }, // frames 5-9: down
    ],
    actions: { up: [0, 1, 2, 3, 4], down: [5, 6, 7, 8, 9] },
    action: 'up',
  });
  leafer.add(robot);
  pick(stage, 'action', ['up', 'down'], (v) => (robot.action = v), 2200, 'up');

  return stage.dispose;
};

export default mount;
