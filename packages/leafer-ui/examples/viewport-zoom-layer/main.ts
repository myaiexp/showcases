// App & Engine: choosing which Group is the zoom layer
import { Leafer, Group, Rect } from 'leafer-ui';
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
      type: 'viewport',
      fill: '#333',
    }),
  );
  const group = new Group();
  leafer.add(group);
  leafer.zoomLayer = group; // only this group pans and zooms

  // fixed layer
  leafer.add(new Rect({ x: u(20), y: u(20), width: u(80), height: u(60), fill: '#FF4B4B', draggable: true }));
  // zoom / move layer
  group.add(new Rect({ x: u(100), y: u(70), width: u(120), height: u(100), fill: GREEN, draggable: true }));
  viewReadout(stage, group);

  if (stage.preview) wheelTour(stage, leafer);

  return stage.dispose;
};

export default mount;
