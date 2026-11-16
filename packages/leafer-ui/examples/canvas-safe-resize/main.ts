// Canvas: safeResize keeps content on resize
import { Canvas, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, toggle, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width with safeResize on and off.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const canvas = new Canvas({ ...mid(stage, S, S * 0.6), width: 100, height: 60, scale: S / 100, safeResize: true });
  leafer.add(canvas);
  const { context } = canvas;
  const draw = (): void => {
    context.fillStyle = '#FF4B4B';
    context.beginPath();
    context.arc(30, 30, 25, 0, Math.PI * 2);
    context.fill();
    canvas.paint();
  };
  draw();
  const note = caption(stage, leafer);
  toggle(stage, 'safeResize', true, (v) => (canvas.safeResize = v), 3000);
  drive(stage, 'width', [60, 160, 2], 100, (v) => {
    canvas.width = v;
    note.text = `safeResize: ${canvas.safeResize}`;
  }, 3);

  return stage.dispose;
};

export default mount;
