// PointerEvent: down, move and up on a rect, logged with positions
import { Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move over the rect, press and release. Move events are thinned out in the log.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const w = stage.width * 0.5;
  const h = stage.height * 0.4;
  const rect = new Rect({ x: (stage.width - w) / 2, y: stage.height - h - 14, width: w, height: h, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);

  let moves = 0;
  const at = (e: PointerEvent): string => `(${Math.round(e.x)}, ${Math.round(e.y)})`;
  rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
    rect.fill = '#ff4b4b';
    log(`${PointerEvent.DOWN} ${at(e)} buttons ${e.buttons}`);
  });
  rect.on(PointerEvent.MOVE, (e: PointerEvent) => {
    if (++moves % 12 === 1) log(`${PointerEvent.MOVE} ${at(e)}`);
  });
  rect.on(PointerEvent.UP, (e: PointerEvent) => {
    rect.fill = GREEN;
    log(`${PointerEvent.UP} ${at(e)}`);
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: stage.width / 2, y: rect.y! + h / 2 };
    script(stage, async () => {
      ghost.leave();
      await ghost.glide(c.x - w / 2 - 20, c.y, 400);
      await ghost.glide(c.x - 20, c.y, 600);
      ghost.down();
      await stage.wait(300);
      ghost.up();
      await ghost.glide(c.x + w, c.y, 500);
      await stage.wait(500);
    });
  }
  return stage.dispose;
};

export default mount;
