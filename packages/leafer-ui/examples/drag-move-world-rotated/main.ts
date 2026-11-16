// DragEvent: dragging by hand inside a rotated leafer with moveWorld
import { DragEvent, Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro, label } from '../../shared/basics.ts';
import { GREEN } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The whole leafer is rotated 30 degrees. The rect still follows the pointer exactly.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  leafer.set({ rotation: 30, x: stage.width * 0.3 }); // the view itself is rotated
  const s = Math.min(stage.width * 0.28, stage.height * 0.4);
  const rect = new Rect({ x: stage.width * 0.2, y: 20, width: s, height: s, fill: GREEN, cornerRadius: 8 });
  leafer.add(rect);
  const say = label(stage, '', true);

  rect.on(DragEvent.DRAG, (e: DragEvent) => {
    e.current.moveWorld(e.moveX, e.moveY); // world offsets, not the rect's own axes
    say(`moveX ${e.moveX.toFixed(1)}  moveY ${e.moveY.toFixed(1)}`);
  });

  if (stage.preview) {
    const b = rect.worldBoxBounds;
    const c = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
    dragToAndFro(stage, leafer, c, { x: c.x + 70, y: c.y + 40 });
  }
  return stage.dispose;
};

export default mount;
