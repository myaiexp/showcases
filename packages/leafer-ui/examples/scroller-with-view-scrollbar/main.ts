// Scroller: a Box beside the view scrollbar
import { App, Box, Rect } from 'leafer-ui';
import '@leafer-in/viewport'; // the viewport plugin
import '@leafer-in/state'; // interaction states
import '@leafer-in/animate'; // animation
import { ScrollBar } from '@leafer-in/scroll'; // the view scrollbar
import '@leafer-in/scroller'; // scrollbars for Box and Frame
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { scrollerRects } from '../../shared/plugin-kit.ts';
import { wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Wheel over the box until it ends, then keep going: the view scrolls.", paper: 'transparent' });
  const k = stage.preview ? 0.3 : 0.6; // the docs' box is 500 x 600; this one is scaled to the pane
  const app = stage.own(new App({ view: stage.view, fill: '#333', move: { holdSpaceKey: true }, tree: { type: 'document' }, sky: {} }));
  new ScrollBar(app); // the view's own scrollbar (the docs: to be replaced by the scroller plugin)

  const box = Box.one(
    {
      fill: 'white',
      overflow: 'scroll', // content outside the box scrolls

      children: scrollerRects(k),
    },
    (stage.width - 500 * k) / 2,
    20,
    500 * k,
    (stage.preview ? 90 : 220),
  );
  app.tree.add(box);
  app.tree.add(Rect.one({ draggable: true, fill: '#32cd79' }, 20, stage.preview ? 400 : 700, 300 * k, 300 * k));

  if (stage.preview) {
    // The pointer rests on the box so its bars show; wheel turns scroll it.
    stage.ghost(app).move(stage.width / 2, 60);
    wheelTour(stage, app, { zoom: false, at: { x: stage.width / 2, y: 60 }, panSteps: 12, panDelta: 40 });
  }

  return stage.dispose;
};

export default mount;
