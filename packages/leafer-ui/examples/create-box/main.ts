// Basics: a Box with a child Ellipse
import { Leafer, Box, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the yellow circle inside the red box.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const box = new Box({ x: u(30), y: u(30), width: u(100), height: u(100), fill: '#FF4B4B' });
  const circle = new Ellipse({ x: u(60), y: u(60), width: u(50), height: u(50), fill: '#FEB027', draggable: true });

  leafer.add(box);
  box.add(circle);

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(115), y: u(115) }, { x: u(170), y: u(60) });

  return stage.dispose;
};

export default mount;
