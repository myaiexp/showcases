// Canvas: context drawing and paint()
import { Canvas, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the canvas; the circle is repainted every frame.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const canvas = new Canvas({ ...mid(stage, S), width: 100, height: 100, scale: S / 100, draggable: true });
  leafer.add(canvas);
  const { context } = canvas;
  stage.loop((_dt, t) => {
    const r = 15 + Math.abs(Math.sin(t * 1.5)) * 15;
    context.clearRect(0, 0, 100, 100);
    context.fillStyle = '#FF4B4B';
    context.beginPath();
    context.roundRect(0, 0, 100, 100, 30);
    context.arc(50, 50, 25, 0, Math.PI * 2);
    context.fill('evenodd');
    context.fillStyle = '#FEB027';
    context.beginPath();
    context.arc(50, 50, r, 0, Math.PI * 2);
    context.fill();
    canvas.paint(); // drawn content only shows after paint()
  });

  return stage.dispose;
};

export default mount;
