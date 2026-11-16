// nextRender: a one-shot callback for the next render frame, and cancelling it
import { Leafer, Rect, RenderEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the rect, queue a nextRender callback, or queue one and remove it before the frame.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = stage.preview ? 70 : 100;
  const rect = new Rect({ x: 30, y: stage.height / 2 - s / 2 + 14, width: s, height: s, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  leafer.on(RenderEvent.AFTER, () => void 0);

  let id = 0;
  const queue = (): (() => void) => {
    const n = ++id;
    const fn = function (this: { tag: string }): void {
      log(`nextRender #${n} ran (this.tag = ${this.tag})`);
    };
    rect.nextRender(fn, { tag: 'bound' }); // second argument is `this`
    log(`queued #${n}`);
    return fn;
  };
  const move = (): void => {
    rect.x = rect.x === 30 ? stage.width - s - 30 : 30;
    log('rect.x changed');
  };

  if (stage.bar) {
    button(stage.bar, 'move + nextRender()', () => (move(), queue()));
    button(stage.bar, 'queue, then removeNextRender()', () => {
      const fn = queue();
      rect.removeNextRender(fn);
      log('removed before the frame: it never runs');
    });
  } else {
    const step = (): void => {
      move();
      queue();
      stage.after(900, () => rect.removeNextRender(queue()));
    };
    step();
    stage.every(2600, step);
  }
  return stage.dispose;
};

export default mount;
