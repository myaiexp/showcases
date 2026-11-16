// Robot: an action as { keyframes, loop, FPS }
import { Leafer } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin: sprite-sheet game elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { arrowSheet } from '../../shared/sprites.ts'; // the docs' arrows.png, painted in code: 20 frames of 100 x 100

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Each robot reads its own action settings." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const scale = stage.preview ? 0.8 : 1.4; // frames are 100 x 100

  const robot = new Robot({
    x: (stage.width - 100 * scale) / 2,
    y: (stage.height - 100 * scale) / 2,
    scale,
    robot: { url: arrowSheet(), size: { width: 100, height: 100 }, total: 20 },
    actions: {
      slow: { keyframes: [5, 6, 7, 8, 9], loop: false, FPS: 3 }, // once, slowly
      fast: { keyframes: [15, 16, 17, 18, 19], loop: true, FPS: 24 }, // forever, fast
    },
    action: 'fast',
  });
  leafer.add(robot);
  const other = new Robot({
    x: robot.x! - 70 * scale,
    y: robot.y,
    scale,
    robot: { url: arrowSheet(), size: { width: 100, height: 100 }, total: 20 },
    actions: { slow: { keyframes: [5, 6, 7, 8, 9], loop: false, FPS: 3 } },
    action: 'slow',
  });
  robot.x = robot.x! + 70 * scale;
  leafer.add(other);
  stage.every(3500, () => {
    other.action = '';
    other.action = 'slow'; // run the once-only action again
  });

  return stage.dispose;
};

export default mount;
