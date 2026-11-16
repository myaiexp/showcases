// App & engine config: calibrating the wheel step
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ctrl + wheel to zoom and change delta.y.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      wheel: { delta: { x: 20, y: 8 } }, // the defaults are 80 / 4 and 8
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

  if (stage.preview) {
    cycle(stage, [4, 24], (y) => (leafer.config.wheel!.delta = { x: 20, y }), 5600);
    wheelTour(stage, leafer, { pan: false, hold: 300 });
  } else slider(stage.bar!, 'delta.y', 2, 40, 1, 8, (y) => (leafer.config.wheel!.delta = { x: 20, y }));

  return stage.dispose;
};

export default mount;
