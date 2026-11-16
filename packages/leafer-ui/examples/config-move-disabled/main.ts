// App & engine config: disabling view panning
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle disabled and scroll the wheel.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      move: { disabled: false }, // the default
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

  const setDisabled = (on: boolean): void => void (leafer.config.move!.disabled = on);
  if (stage.preview) {
    cycle(stage, [false, true], setDisabled, 5200);
    wheelTour(stage, leafer, { zoom: false, hold: 400 });
  } else checkbox(stage.bar!, 'move.disabled', false, setDisabled);

  return stage.dispose;
};

export default mount;
