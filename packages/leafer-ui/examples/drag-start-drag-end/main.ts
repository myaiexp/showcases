// DragEvent: the three phases of a drag with moveX and totalX
import { DragEvent, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro } from '../../shared/basics.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the rect. start and end log once, drag is thinned out.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.28, stage.height * 0.4);
  const rect = new Rect({ x: 24, y: stage.height - s - 16, width: s, height: s, fill: GREEN, cornerRadius: 10, draggable: true });
  leafer.add(rect);

  let n = 0;
  rect.on(DragEvent.START, () => ((n = 0), log(DragEvent.START)));
  rect.on(DragEvent.DRAG, (e: DragEvent) => {
    if (++n % 8 === 0) log(`${DragEvent.DRAG}  move ${Math.round(e.moveX)},${Math.round(e.moveY)}  total ${Math.round(e.totalX)},${Math.round(e.totalY)}`);
  });
  rect.on(DragEvent.END, (e: DragEvent) => log(`${DragEvent.END}  total ${Math.round(e.totalX)},${Math.round(e.totalY)}`));

  if (stage.preview) dragToAndFro(stage, leafer, { x: 24 + s / 2, y: rect.y! + s / 2 }, { x: stage.width - s / 2 - 24, y: rect.y! + s / 2 - 10 });
  return stage.dispose;
};

export default mount;
