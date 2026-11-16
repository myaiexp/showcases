// Pen: arc() joins, drawArc() stays separate
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle independent: arc() adds a line from the last point.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const draw = (independent: boolean): void => {
    pen.clear();
    pen.setStyle({ stroke: '#FF4B4B', strokeWidth: 3 });
    pen.moveTo(5, 10).lineTo(30, 30);
    if (independent) pen.drawArc(55, 50, 20, 0, 270).drawEllipse(55, 80, 35, 10);
    else pen.arc(55, 50, 20, 0, 270).ellipse(55, 80, 35, 10);
  };
  toggle(stage, 'independent', true, draw, 1700);

  return stage.dispose;
};

export default mount;
