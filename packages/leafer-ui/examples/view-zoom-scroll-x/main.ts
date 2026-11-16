// View: zoom(element, 0, "x") pans along x only
import { App } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor (the docs' rects are editable)
import '@leafer-in/viewport'; // the viewport plugin
import '@leafer-in/view'; // the view control plugin: adds zoom() to the Leafer elements
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { duoRects, replay } from '../../shared/plugin-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Press Run to repeat it, Reset view to start again." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const [rect1, rect2] = duoRects(stage, { editable: true, corner: true });
  app.tree.add(rect1);
  app.tree.add(rect2);
  const pad = stage.preview ? 30 : 100; // the docs' 100 px padding, shrunk for a card

  replay(
    stage,
    app.tree,
    () => {
      app.tree.zoom(rect2, 0, 'x');
    },
    1800,
  );

  return stage.dispose;
};

export default mount;
