// App & engine config: reversing the wheel direction
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle reverse and scroll the wheel.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      wheel: { posDeltaSpeed: 1, negDeltaSpeed: 1 }, // negative values reverse
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

    const setReverse = (on: boolean): void => {
      leafer.config.wheel!.posDeltaSpeed = on ? -1 : 1;
      leafer.config.wheel!.negDeltaSpeed = on ? -1 : 1;
    };

  if (stage.preview) {
    cycle(stage, [false, true], setReverse, 5200);
    wheelTour(stage, leafer, { zoom: false, hold: 400 });
  } else checkbox(stage.bar!, 'reverse (-1)', false, setReverse);

  return stage.dispose;
};

export default mount;
