// Advanced: the design viewport type
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wheel pans, ctrl + wheel zooms; hold space (or the middle button) and drag to pan.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'design', // viewport + hold-to-pan + zoom range 0.01 to 256
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN }, u(100), u(50), u(120), u(120)));
  leafer.add(Rect.one({ fill: '#FEB027' }, u(260), u(110), u(70), u(70)));

  viewReadout(stage, leafer);
  if (stage.preview) wheelTour(stage, leafer);

  return stage.dispose;
};

export default mount;
