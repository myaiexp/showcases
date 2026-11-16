// App & Engine: zooming and panning by assigning properties
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout } from '../../shared/basics.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the sliders: x, y and scale of the Leafer itself.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN }, u(100), u(50), u(120), u(120)));
  leafer.add(Rect.one({ fill: '#FEB027' }, u(260), u(110), u(70), u(70)));

  if (stage.preview) {
    stage.loop((_dt, t) => {
      leafer.x = Math.sin(t) * 30;
      leafer.y = Math.cos(t * 0.8) * 20;
      leafer.scale = 1 + (Math.sin(t * 1.3) + 1) * 0.4;
    });
  } else {
    slider(stage.bar!, 'x', -200, 200, 1, 0, (v) => (leafer.x = v));
    slider(stage.bar!, 'y', -150, 150, 1, 0, (v) => (leafer.y = v));
    slider(stage.bar!, 'scale', 0.25, 3, 0.05, 1, (v) => (leafer.scale = v));
    viewReadout(stage, leafer);
  }

  return stage.dispose;
};

export default mount;
