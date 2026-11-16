// Basics: a Canvas element drawn through its 2D context
import { Leafer, Canvas } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { bob, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A red rounded square with a hole and a yellow dot.' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const canvas = new Canvas({ width: 100, height: 100, x: u(100), y: u(40) });
  const { context } = canvas;

  context.fillStyle = '#FF4B4B';
  context.beginPath();
  context.roundRect(0, 0, 100, 100, 30);
  context.arc(50, 50, 25, 0, Math.PI * 2);
  context.fill('evenodd');

  context.fillStyle = '#FEB027';
  context.beginPath();
  context.arc(50, 50, 20, 0, Math.PI * 2);
  context.fill();

  canvas.paint(); // update the render
  leafer.add(canvas);

  if (stage.preview) bob(stage, canvas);

  return stage.dispose;
};

export default mount;
