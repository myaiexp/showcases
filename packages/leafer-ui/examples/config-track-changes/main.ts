// App & engine config: turning change tracking off
import { Leafer, Rect, PropertyEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle trackChanges: the event count stops growing when it is off.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      trackChanges: true, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(40), y: u(80), width: u(60), height: u(60), fill: GREEN });
  leafer.add(rect);
  let count = 0;
  rect.on(PropertyEvent.CHANGE, () => count++);
  const say = label(stage, '', true);
  stage.loop((_dt, t) => {
    rect.x = u(40) + (Math.sin(t * 2) + 1) * stage.width * 0.3;
    say(`trackChanges ${leafer.config.trackChanges}   PropertyEvents: ${count}`);
  });
  const setTrack = (on: boolean): void => void (leafer.config.trackChanges = on);

  if (stage.preview) cycle(stage, [true, false], setTrack, 2200);
  else checkbox(stage.bar!, 'trackChanges', true, setTrack);

  return stage.dispose;
};

export default mount;
