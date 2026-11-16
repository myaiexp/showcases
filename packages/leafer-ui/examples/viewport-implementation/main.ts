// Advanced: the viewport type written out as config and listeners
import { App, Rect, MoveEvent, ZoomEvent } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Wheel pans (shift + wheel sideways), ctrl + wheel zooms; a trackpad pinches.', paper: 'transparent' });
  const u = sizer(stage);
  const app = stage.own(
    new App({
      view: stage.view,
      fill: '#333',
      // The following config and listeners equal tree: { type: 'viewport' }
      tree: {},
      wheel: { preventDefault: true }, // stop the browser scrolling the page
      touch: { preventDefault: true }, // stop touch scrolling the page
      pointer: { preventDefaultMenu: true }, // stop the browser's context menu
    }),
  );
  app.tree.add(Rect.one({ fill: GREEN }, u(100), u(50), u(120), u(120)));
  app.tree.add(Rect.one({ fill: '#FEB027' }, u(260), u(110), u(70), u(70)));

  // Pan the view
  app.tree.on(MoveEvent.BEFORE_MOVE, (e: MoveEvent) => {
    app.tree.zoomLayer.move(app.tree.getValidMove(e.moveX, e.moveY));
  });
  // Zoom the view
  app.tree.on(ZoomEvent.BEFORE_ZOOM, (e: ZoomEvent) => {
    app.tree.zoomLayer.scaleOfWorld(e, app.tree.getValidScale(e.scale));
  });
  viewReadout(stage, app.tree);

  if (stage.preview) wheelTour(stage, app);

  return stage.dispose;
};

export default mount;
