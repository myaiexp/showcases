// Advanced: a viewport type on the tree layer
import { App, Rect } from 'leafer-ui';
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
      tree: { type: 'viewport' }, // give the tree layer a viewport
    }),
  );
  app.tree.add(Rect.one({ fill: GREEN }, u(100), u(50), u(120), u(120)));
  app.tree.add(Rect.one({ fill: '#FEB027' }, u(260), u(110), u(70), u(70)));
  viewReadout(stage, app.tree);

  if (stage.preview) wheelTour(stage, app);

  return stage.dispose;
};

export default mount;
