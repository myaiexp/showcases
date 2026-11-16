// Pen: clearPath removes the last path only
import { Leafer, Pen } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press step to run the next operation.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const pen = new Pen();
  pen.set({ ...mid(stage, S), scale: S / 100 });
  leafer.add(pen);
  const note = caption(stage, leafer);
  const steps: [string, () => void][] = [
    ['setStyle + rect', () => { pen.setStyle({ fill: '#FF4B4B' }); pen.rect(5, 5, 40, 40); }],
    ['setStyle + arc', () => { pen.setStyle({ fill: '#FEB027' }); pen.arc(75, 25, 20); }],
    ['setStyle + roundRect', () => { pen.setStyle({ fill: '#32cd79' }); pen.roundRect(5, 55, 90, 40, 15); }],
    ['clearPath(): last path only', () => pen.clearPath()],
    ['clear(): everything', () => pen.clear()],
  ];
  let i = 0;
  const step = (): void => {
    const [name, run] = steps[i]!;
    run();
    note.text = name;
    i = (i + 1) % steps.length;
  };
  if (stage.bar) button(stage.bar, 'step', step);
  else stage.every(1100, step);

  return stage.dispose;
};

export default mount;
