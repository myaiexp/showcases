// Robot: play, pause and stop
import { Leafer } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin: sprite-sheet game elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { arrowSheet } from '../../shared/sprites.ts'; // the docs' arrows.png, painted in code: 20 frames of 100 x 100
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Use the buttons." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const scale = stage.preview ? 0.8 : 1.4; // frames are 100 x 100

  const robot = new Robot({
    x: (stage.width - 100 * scale) / 2,
    y: (stage.height - 100 * scale) / 2,
    scale,
    robot: { url: arrowSheet(), size: { width: 100, height: 100 }, total: 20 },
    actions: { arrowRight: [5, 6, 7, 8, 9] },
    action: 'arrowRight',
  });
  leafer.add(robot);
  if (stage.bar) {
    button(stage.bar, 'play()', () => robot.play());
    button(stage.bar, 'pause()', () => robot.pause());
    button(stage.bar, 'togglePlay()', () => robot.togglePlay());
    button(stage.bar, 'stop()', () => robot.stop());
  } else stage.every(1300, () => robot.togglePlay()); // a card alternates running and paused

  return stage.dispose;
};

export default mount;
