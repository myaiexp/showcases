// Scroller: overflow "scroll" on a Box
import { Leafer, Box } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import '@leafer-in/state'; // interaction states
import '@leafer-in/animate'; // animation
import '@leafer-in/scroller'; // scrollbars for Box and Frame
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scrollerRects } from '../../shared/plugin-kit.ts';
import { wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the box and wheel to scroll it; the bars show while you do. ", paper: 'transparent' });
  const k = stage.preview ? 0.3 : 0.6; // the docs' box is 500 x 600; this one is scaled to the pane
  const leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));

  const box = Box.one(
    {
      fill: 'white',
      overflow: 'scroll', // content outside the box scrolls

      children: scrollerRects(k),
    },
    (stage.width - 500 * k) / 2,
    (stage.height - 560 * k) / 2,
    500 * k,
    560 * k,
  );
  leafer.add(box);

  if (stage.preview) {
    // The pointer rests on the box so its bars show; wheel turns scroll it.
    stage.ghost(leafer).move(stage.width / 2, stage.height / 2);
    wheelTour(stage, leafer, { zoom: false, at: { x: stage.width / 2, y: stage.height / 2 }, panSteps: 12, panDelta: 40 });
  }

  return stage.dispose;
};

export default mount;
