// Advanced: the document viewport type
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer, viewReadout, wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Scroll with the wheel: it stops at the content; zoom out below 1 is refused.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      type: 'document', // scroll limited to the content, zoom from 1
      fill: '#333',
    }),
  );
  leafer.add(Rect.one({ fill: GREEN }, u(100), u(100), u(200), u(200)));
  leafer.add(Rect.one({ fill: GREEN }, u(100), u(600), u(200), u(200)));
  leafer.add(Rect.one({ fill: GREEN }, u(100), u(1200), u(200), u(200)));
  leafer.add(Rect.one({ fill: GREEN }, u(100), u(1800), u(200), u(200)));
  viewReadout(stage, leafer);

  if (stage.preview) wheelTour(stage, leafer, { panSteps: 14, panDelta: 60 });

  return stage.dispose;
};

export default mount;
