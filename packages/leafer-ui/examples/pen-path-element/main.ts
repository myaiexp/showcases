// Pen: setStyle creates a Path child
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press add path to start another sub-path.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const note = caption(stage, leafer);
  const colors = ['#FF4B4B', '#FEB027', '#32cd79', '#4B8BFF'];
  let n = 0;
  const add = (): void => {
    if (n === colors.length) { pen.clear(); n = 0; }
    pen.setStyle({ fill: colors[n] });
    pen.arc(25 + (n % 2) * 50, 25 + Math.floor(n / 2) * 50, 22);
    n++;
    note.text = `children: ${pen.children.length}, pathElement fill: ${String(pen.pathElement?.fill)}`;
  };
  add();
  if (stage.bar) button(stage.bar, 'add path', add);
  else stage.every(1000, add);

  return stage.dispose;
};

export default mount;
