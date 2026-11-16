// Canvas: smooth image rendering on and off
import { Canvas, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle smooth.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const canvas = new Canvas({ ...mid(stage, S), width: 8, height: 8, scale: S / 8, smooth: true });
  leafer.add(canvas);
  const { context } = canvas;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      context.fillStyle = (x + y) % 2 ? '#32cd79' : '#1d2b53';
      if ((x - 3.5) ** 2 + (y - 3.5) ** 2 < 10) context.fillRect(x, y, 1, 1);
    }
  }
  canvas.paint();
  toggle(stage, 'smooth', true, (v) => (canvas.smooth = v), 1400);

  return stage.dispose;
};

export default mount;
