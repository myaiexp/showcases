// DragEvent: a handle that drags another element through setList
import { DragEvent, Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the blue handle: the green square (not draggable itself) follows. Dragging the square does nothing.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const s = Math.min(stage.width * 0.3, stage.height * 0.4);
  const square = new Rect({ x: (stage.width - s) / 2, y: stage.height * 0.35, width: s, height: s, fill: GREEN, cornerRadius: 10 });
  const handle = new Rect({ x: square.x, y: square.y! - 24, width: s, height: 16, fill: '#4B8BFF', cornerRadius: 8, draggable: true });
  leafer.add([square, handle]);

  handle.on(PointerEvent.DOWN, () => DragEvent.setList(square)); // reset after the drop
  handle.on(DragEvent.DRAG, (e: DragEvent) => void e);

  if (stage.preview) dragToAndFro(stage, leafer, { x: handle.x! + s / 2, y: handle.y! + 8 }, { x: stage.width * 0.7, y: stage.height * 0.4 });
  return stage.dispose;
};

export default mount;
