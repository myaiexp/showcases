// UIEvent: which button and which modifier keys were down for a tap
import { Leafer, PointerButton, PointerEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the rect with the left, middle or right button, holding shift, ctrl or alt.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = Math.min(stage.width * 0.4, stage.height * 0.45);
  const rect = new Rect({ x: (stage.width - s) / 2, y: stage.height - s - 14, width: s, height: s, fill: GREEN, cornerRadius: 12 });
  leafer.add(rect);

  rect.on(PointerEvent.DOWN, (e: PointerEvent) => {
    const keys = [e.shiftKey && 'shift', e.ctrlKey && 'ctrl', e.altKey && 'alt'].filter(Boolean).join('+') || 'no keys';
    const button = e.left ? 'left' : e.middle ? 'middle' : e.right ? 'right' : '?';
    rect.fill = e.right ? '#4B8BFF' : e.middle ? '#feb027' : GREEN;
    log(`buttons ${e.buttons} (${button})  ${keys}`);
  });
  rect.on(PointerEvent.UP, () => (rect.fill = GREEN));

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: stage.width / 2, y: rect.y! + s / 2 };
    const steps = [{}, { buttons: PointerButton.MIDDLE }, { buttons: PointerButton.RIGHT }, { shiftKey: true }, { ctrlKey: true, altKey: true }];
    script(stage, async () => {
      for (const opts of steps) {
        await ghost.tap(c.x, c.y, { ...opts, glide: 200 });
        await stage.wait(700);
      }
    });
  }
  return stage.dispose;
};

export default mount;
