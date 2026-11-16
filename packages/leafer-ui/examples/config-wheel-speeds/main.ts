// App & engine config: tuning wheel zoom and pan speed
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Use the wheel (ctrl + wheel zooms) and move the sliders.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      wheel: { zoomSpeed: 0.5, moveSpeed: 0.5 }, // the defaults
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(70), u(40), u(120), u(100)));
  leafer.add(Rect.one({ fill: '#FEB027', draggable: true }, u(230), u(120), u(80), u(80)));
  leafer.add(Rect.one({ fill: '#4B7BFF' }, u(120), u(260), u(100), u(100)));
  viewReadout(stage, leafer);

  if (stage.preview) {
    const values = [0.1, 0.9];
    const apply = (s: (typeof values)[number]) => ((leafer.config.wheel!.zoomSpeed = s), (leafer.config.wheel!.moveSpeed = s));
    wheelTour(stage, leafer, { hold: 300, reset: leafer, round: (n) => apply(values[n % values.length]!) });
  } else {
    slider(stage.bar!, 'zoomSpeed', 0, 1, 0.05, 0.5, (s) => (leafer.config.wheel!.zoomSpeed = s));
    slider(stage.bar!, 'moveSpeed', 0, 1, 0.05, 0.5, (s) => (leafer.config.wheel!.moveSpeed = s));
  }

  return stage.dispose;
};

export default mount;
