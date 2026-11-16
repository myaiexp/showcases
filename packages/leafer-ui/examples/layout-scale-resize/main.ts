// Layout: scaleResize turns a scale into a size
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/resize'; // the resize plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'scaleResize(k) multiplies width and height (the editor does this when you drag a handle); scaleX stays 1, so strokes do not stretch.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const rect = new Rect({ x: 20, y: 20, width: S, height: S, fill: '#32cd79', stroke: '#222', strokeWidth: 6, cornerRadius: 10 });
  leafer.add(rect);
  const show = label(stage, '', true);
  drive(stage, 'scaleResize', [0.5, 2, 0.05], 1, (k) => {
    rect.set({ width: S, height: S });
    rect.scaleResize(k, k * 0.8);
    show(`rect.scaleResize(${k.toFixed(2)}, ${(k * 0.8).toFixed(2)})\nwidth ${Math.round(rect.width!)}  height ${Math.round(rect.height!)}  scaleX ${rect.scaleX}`);
  }, 4);

  return stage.dispose;
};

export default mount;
