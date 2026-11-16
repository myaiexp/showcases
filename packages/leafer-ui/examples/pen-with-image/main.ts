// Pen: image fill on a drawn path
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';
import { color } from '../../shared/controls.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the photo circle radius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const draw = (r: number): void => {
    pen.clear();
    pen.setStyle({ fill: { type: 'radial', stops: [{ offset: 0, color: '#4DCB71' }, { offset: 1, color: '#79CB4D' }] }, windingRule: 'evenodd' });
    pen.roundRect(0, 0, 100, 100, 30).arc(50, 50, 25);
    pen.setStyle({ fill: { type: 'image', url: photo() } });
    pen.arc(50, 50, r);
  };
  drive(stage, 'radius', [5, 24, 0.5], 20, draw, 4);

  return stage.dispose;
};

export default mount;
