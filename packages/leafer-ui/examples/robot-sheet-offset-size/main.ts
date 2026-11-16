// Robot: offset and a numeric size slice a sheet
import { Leafer } from 'leafer-ui';
import { Robot } from '@leafer-in/robot'; // the Robot plugin: sprite-sheet game elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { arrowSheet } from '../../shared/sprites.ts'; // the docs' arrows.png, painted in code: 20 frames of 100 x 100

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Five frames cut from the sheet's second row." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const scale = stage.preview ? 0.8 : 1.4; // frames are 100 x 100

  const robot = new Robot({
    x: (stage.width - 100 * scale) / 2,
    y: (stage.height - 100 * scale) / 2,
    scale,
    robot: { url: arrowSheet(), offset: { x: 0, y: 100 }, size: 100, total: 5 }, // start one row down, 100 x 100 frames
    actions: { slide: [0, 1, 2, 3, 4] },
    action: 'slide',
  });
  leafer.add(robot);

  return stage.dispose;
};

export default mount;
