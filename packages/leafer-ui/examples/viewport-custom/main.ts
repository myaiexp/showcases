// Advanced: custom handling of move and zoom events
import { Leafer, Rect, MoveEvent, ZoomEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wheel pans (shift + wheel sideways), ctrl + wheel zooms; a trackpad pinches.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'custom', // events only, no built-in handling
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN }, u(100), u(50), u(120), u(120)));
  leafer.add(Rect.one({ fill: '#FEB027' }, u(260), u(110), u(70), u(70)));

    // The custom type only forwards the events: pan and zoom the layer yourself.
    leafer.on(MoveEvent.BEFORE_MOVE, (e: MoveEvent) => {
      const { x, y } = leafer.getValidMove(e.moveX, e.moveY);
      leafer.zoomLayer.move(x, y);
    });
    leafer.on(ZoomEvent.BEFORE_ZOOM, (e: ZoomEvent) => {
      const center = { x: e.x, y: e.y };
      leafer.zoomLayer.scaleOfWorld(center, leafer.getValidScale(e.scale));
    });
    viewReadout(stage, leafer);

  if (stage.preview) wheelTour(stage, leafer);

  return stage.dispose;
};

export default mount;
