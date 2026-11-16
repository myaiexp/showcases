// Animate: listening to an animation's own events through the event option
import { Leafer, Rect } from 'leafer-ui';
import { AnimateEvent } from '@leafer-in/animate'; // the animation plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { GREEN, logger } from '../../shared/event-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Run the animation, pause it midway, stop it. Updates are counted, other events listed.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const log = logger(stage);
  const s = stage.preview ? 56 : 80;
  const rect = new Rect({ x: 20, y: (stage.height - s) / 2 + 20, width: s, height: s, cornerRadius: 12, fill: GREEN });
  leafer.add(rect);

  let updates = 0;
  const to = stage.width - s - 20;
  const run = (): void => {
    rect.x = 20;
    updates = 0;
    const anim = rect.animate(
      { x: to },
      {
        duration: 1.5,
        event: {
          [AnimateEvent.PLAY]: () => log('play'),
          [AnimateEvent.UPDATE]: () => {
            if (++updates % 20 === 0) log(`update x ${updates}`);
          },
          [AnimateEvent.PAUSE]: () => log('pause'),
          [AnimateEvent.STOP]: () => log('stop'),
          [AnimateEvent.COMPLETED]: () => log(`completed after ${updates} updates`),
        },
      },
    );
    anim.on(AnimateEvent.CREATED, () => log('created'));
    return void anim;
  };
  run();
  if (stage.bar) button(stage.bar, 'run again', run);
  else stage.every(3200, run);
  return stage.dispose;
};

export default mount;
