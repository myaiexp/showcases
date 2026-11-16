// Basics: a Frame clipping a child Ellipse
import { Leafer, Frame, Ellipse } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, dragToAndFro, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the circle past the frame\'s edge: it is clipped.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  const frame = new Frame({ x: u(30), y: u(30), width: u(100), height: u(100) });
  const circle = new Ellipse({ x: u(60), y: u(60), width: u(50), height: u(50), fill: GREEN, draggable: true });

  leafer.add(frame);
  frame.add(circle);

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(115), y: u(115) }, { x: u(150), y: u(90) });

  return stage.dispose;
};

export default mount;
