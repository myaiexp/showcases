// App & engine config: constraining pan direction and range
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, label, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a scroll mode and pan with the wheel (shift + wheel for sideways).', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { scroll: false }, // the default
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

    const setScroll = (s: string): void => {
      leafer.config.move!.scroll = s === 'false' ? false : s === 'true' ? true : (s as 'x');
      say(`move.scroll: ${s}`);
    };
    const say = label(stage, '');

  const modes = ['false', 'true', 'x', 'y', 'limit', 'x-limit', 'y-limit'];
  if (stage.preview) {
    cycle(stage, modes, setScroll, 3000);
    wheelTour(stage, leafer, { zoom: false, diagonal: true, panSteps: 4, panDelta: 25, hold: 200 });
  } else select(stage.bar!, 'move.scroll', modes, setScroll, 'false');

  return stage.dispose;
};

export default mount;
