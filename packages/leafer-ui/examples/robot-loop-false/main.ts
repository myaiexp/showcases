// Robot: loop false plays an action once
import { Leafer } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin: sprite-sheet game elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { arrowSheet } from '../../shared/sprites.ts'; // the docs' arrows.png, painted in code: 20 frames of 100 x 100
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The arrow slides once, then rests on its last frame. Press Replay." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const scale = stage.preview ? 0.8 : 1.4; // frames are 100 x 100

  const robot = new Robot({
    x: (stage.width - 100 * scale) / 2,
    y: (stage.height - 100 * scale) / 2,
    scale,
    robot: { url: arrowSheet(), size: { width: 100, height: 100 }, total: 20 },
    actions: { arrowRight: [5, 6, 7, 8, 9] },
    loop: false, // play once
    FPS: 4,
  });
  leafer.add(robot);
  const play = (): void => {
    robot.action = ''; // setting the same action again would not restart it
    robot.action = 'arrowRight';
  };
  play();
  if (stage.bar) button(stage.bar, 'Replay', play);
  else stage.every(2600, play);

  return stage.dispose;
};

export default mount;
