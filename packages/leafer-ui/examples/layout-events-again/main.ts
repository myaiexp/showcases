// LayoutEvent: following a layout cycle and asking for one more pass
import { Leafer, LayoutEvent, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the rect. With "again" on, the after listener changes the rect once more and asks for another layout pass.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage, stage.preview ? 7 : 10);
  const rect = new Rect({ x: 20, y: stage.height - 70, width: 40, height: 40, fill: GREEN, cornerRadius: 8 });
  leafer.add(rect);

  let again = true;
  let echo = false;
  leafer.on(LayoutEvent.REQUEST, () => log('layout.request'));
  leafer.on(LayoutEvent.START, () => log('layout.start'));
  leafer.on(LayoutEvent.LAYOUT, (e: LayoutEvent) => log(`layout  times ${e.times}  blocks ${e.data.length}`));
  leafer.on(LayoutEvent.AFTER, () => {
    if (again && !echo) {
      echo = true;
      rect.y = (rect.y ?? 0) + 1; // another change while laying out
    }
    if (leafer.watcher.changed) leafer.emit(LayoutEvent.AGAIN); // the docs' pattern
  });
  leafer.on(LayoutEvent.END, () => {
    log('layout.end');
    echo = false;
  });

  const move = (): void => void (rect.x = rect.x === 20 ? stage.width - 60 : 20);
  if (stage.bar) {
    checkbox(stage.bar, 'change again in after', true, (v) => (again = v));
    button(stage.bar, 'move rect', move);
  } else stage.every(2600, move);
  return stage.dispose;
};

export default mount;
