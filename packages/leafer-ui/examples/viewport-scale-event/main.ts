// App & Engine: listening to LeaferEvent.SCALE
import { Leafer, Rect, LeaferEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer, wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ctrl + wheel to zoom: the readout follows the event.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'viewport',
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(100), y: u(60), width: u(120), height: u(120), fill: GREEN, draggable: true });
  leafer.add(rect);
  const say = label(stage, 'leafer.scale 1', true);

  leafer.on(LeaferEvent.SCALE, function () {
    // Zooming the view, or assigning scale, reports the new scale here.
    say(`LeaferEvent.SCALE: leafer.scaleX = ${leafer.scaleX?.toFixed(2)}`);
  });

  if (stage.preview) wheelTour(stage, leafer, { pan: false });

  return stage.dispose;
};

export default mount;
