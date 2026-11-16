// Robot: an action that is one frame number
import { Leafer } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin: sprite-sheet game elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { arrowSheet } from '../../shared/sprites.ts'; // the docs' arrows.png, painted in code: 20 frames of 100 x 100
import { pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick an action: each is one frame of the sheet." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const scale = stage.preview ? 0.8 : 1.4; // frames are 100 x 100

  const robot = new Robot({
    x: (stage.width - 100 * scale) / 2,
    y: (stage.height - 100 * scale) / 2,
    scale,
    robot: { url: arrowSheet(), size: { width: 100, height: 100 }, total: 20 },
    actions: {
      up: 0,
      right: 5,
      down: 10,
      left: 15,
      arrowUp: [0, 1, 2, 3, 4],
      arrowRight: [5, 6, 7, 8, 9],
      arrowDown: [10, 11, 12, 13, 14],
      arrowLeft: [15, 16, 17, 18, 19],
    },
    action: 'right',
  });
  leafer.add(robot);
  pick(stage, 'action', ['up', 'right', 'down', 'left'], (v) => (robot.action = v), 1200, 'right');

  return stage.dispose;
};

export default mount;
