// PointerEvent: the composite tap events, one per gesture
import { Leafer, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tap, double tap and press-and-hold the rect. Only the best matching event fires each time.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.4, stage.height * 0.45);
  const rect = new Rect({ x: (stage.width - s) / 2, y: stage.height - s - 14, width: s, height: s, fill: GREEN, cornerRadius: 12, origin: 'center' });
  leafer.add(rect);

  const flash = (color: string): void => {
    rect.fill = color;
    stage.after(250, () => (rect.fill = GREEN));
  };
  rect.on(PointerEvent.TAP, () => (log('tap'), flash('#4B8BFF')));
  rect.on(PointerEvent.DOUBLE_TAP, () => (log('double_tap'), flash('#feb027')));
  rect.on(PointerEvent.LONG_PRESS, () => (log('long_press (while held)'), flash('#ff4b4b')));
  rect.on(PointerEvent.LONG_TAP, () => log('long_tap (on release)'));

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: stage.width / 2, y: rect.y! + s / 2 };
    script(stage, async () => {
      await ghost.tap(c.x, c.y);
      await stage.wait(900);
      await ghost.doubleTap(c.x, c.y);
      await stage.wait(1200);
      ghost.down();
      await stage.wait(900);
      ghost.up();
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
