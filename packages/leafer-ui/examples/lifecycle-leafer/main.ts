// Advanced: listening to the engine lifecycle
import { Leafer, Rect, LeaferEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Stop and start the engine: the log lists the events in order.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      fill: '#333',
    }),
  );
  leafer.add(new Rect({ x: u(150), y: u(110), width: u(70), height: u(70), fill: GREEN, draggable: true }));
  const log: string[] = [];
  const say = label(stage, '');
  const note = (line: string): void => {
    log.push(line);
    if (log.length > (stage.preview ? 7 : 14)) log.shift();
    say(log.join('\n'));
  };

  for (const type of [LeaferEvent.START, LeaferEvent.BEFORE_READY, LeaferEvent.READY, LeaferEvent.AFTER_READY, LeaferEvent.VIEW_READY, LeaferEvent.VIEW_COMPLETED, LeaferEvent.STOP, LeaferEvent.RESTART]) {
    leafer.on(type, () => note(type));
  }
  leafer.waitReady(() => note('waitReady() callback')); // after the first layout

  const toggle = (): void => (leafer.running ? leafer.stop() : leafer.start());
  if (stage.preview) stage.every(2600, toggle);
  else button(stage.bar!, 'stop / start', toggle);

  return stage.dispose;
};

export default mount;
