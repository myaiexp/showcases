// Pen: arcTo makes a tangent arc
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the radius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const draw = (r: number): void => {
    pen.clear();
    pen.setStyle({ stroke: '#32cd79', strokeWidth: 4 });
    pen.moveTo(10, 90).arcTo(10, 10, 90, 10, r).lineTo(90, 10);
    pen.setStyle({ stroke: '#999999', strokeWidth: 1, dashPattern: [3, 3] });
    pen.moveTo(10, 90).lineTo(10, 10).lineTo(90, 10);
  };
  drive(stage, 'radius', [0, 80, 1], 30, draw, 4);

  return stage.dispose;
};

export default mount;
