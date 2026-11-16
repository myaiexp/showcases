// App & engine config: limiting the zoom range
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zoom with ctrl + wheel; adjust the limits.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      zoom: { min: 0.02, max: 256 }, // the defaults
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

  if (stage.preview) {
    leafer.config.zoom = { min: 0.8, max: 2 };
    wheelTour(stage, leafer, { pan: false, hold: 300 });
  } else {
    slider(stage.bar!, 'zoom.min', 0.02, 1, 0.02, 0.02, (n) => (leafer.config.zoom!.min = n));
    slider(stage.bar!, 'zoom.max', 1, 256, 1, 256, (n) => (leafer.config.zoom!.max = n));
  }

  return stage.dispose;
};

export default mount;
