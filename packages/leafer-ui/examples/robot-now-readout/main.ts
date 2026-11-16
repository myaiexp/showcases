// Robot: reading now while an action plays
import { Leafer } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin: sprite-sheet game elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { arrowSheet } from '../../shared/sprites.ts'; // the docs' arrows.png, painted in code: 20 frames of 100 x 100
import { label } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The frame index follows the animation." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const scale = stage.preview ? 0.8 : 1.4; // frames are 100 x 100

  const robot = new Robot({
    x: (stage.width - 100 * scale) / 2,
    y: (stage.height - 100 * scale) / 2,
    scale,
    robot: { url: arrowSheet(), size: { width: 100, height: 100 }, total: 20 },
    actions: { arrowDown: [10, 11, 12, 13, 14] },
    action: 'arrowDown',
  });
  leafer.add(robot);
  const say = label(stage, '', true);
  stage.loop(() => say(`now: ${robot.now}`));

  return stage.dispose;
};

export default mount;
