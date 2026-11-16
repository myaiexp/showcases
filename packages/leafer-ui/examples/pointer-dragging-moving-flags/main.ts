// PointerEvent: the dragging and moving flags of a move event
import { Leafer, PointerEvent, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover, drag the rect, then drag empty paper (a viewport leafer pans with the left button when drag is on).' });
  const leafer = stage.own(new Leafer({ view: stage.view, type: 'viewport', move: { drag: 'auto' } }));
  const log = logger(stage, stage.preview ? 5 : 8);
  const s = Math.min(stage.width * 0.22, stage.height * 0.3);
  const rect = new Rect({ x: stage.width * 0.2, y: stage.height - s - 24, width: s, height: s, fill: GREEN, cornerRadius: 10, draggable: true });
  leafer.add(rect);

  let last = '';
  let n = 0;
  leafer.on(PointerEvent.MOVE, (e: PointerEvent) => {
    const now = `dragging ${!!e.dragging}  moving ${!!e.moving}`;
    if (now !== last || ++n % 20 === 0) log(now);
    last = now;
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: rect.x! + s / 2, y: rect.y! + s / 2 };
    script(stage, async () => {
      await ghost.glide(c.x + 60, c.y - 40, 500);
      await ghost.glide(c.x, c.y, 400);
      await ghost.drag(c, { x: c.x + 50, y: c.y - 30 }, 600);
      await stage.wait(500);
      await ghost.drag({ x: stage.width - 20, y: stage.height * 0.5 }, { x: stage.width - 70, y: stage.height * 0.45 }, 600);
      await stage.wait(700);
    });
  }
  return stage.dispose;
};

export default mount;
