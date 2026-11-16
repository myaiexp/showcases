// Pen: drawPoints with curve and close
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide curve and toggle close.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const state = { curve: 0.5, close: true };
  const draw = (): void => {
    pen.clear();
    pen.setStyle({ stroke: '#32cd79', strokeWidth: 3, fill: '#32cd7933' });
    pen.drawPoints([10, 90, 10, 10, 50, 70, 90, 10, 90, 90], state.curve, state.close);
  };
  drive(stage, 'curve', [0, 1, 0.02], 0.5, (v) => ((state.curve = v), draw()), 5);
  toggle(stage, 'close', true, (v) => ((state.close = v), draw()), 2400);

  return stage.dispose;
};

export default mount;
