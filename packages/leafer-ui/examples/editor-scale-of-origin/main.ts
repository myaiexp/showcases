// Editor: scaleOf() with a named origin or a point
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The origin can be a name such as 'top-left' or 'bottom-right', or a point in the element's box coordinates." });
  const g = geo(stage);
  const k = stage.preview ? 0.5 : 1;
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const restore = keep(rect1, app);
  app.editor.select(rect1);
  void k;

  actions(
    stage,
    [
      { name: "app.editor.scaleOf('top-left', 1.5)", run: () => app.editor.scaleOf('top-left', 1.5) },
      { name: "app.editor.scaleOf('bottom-right', 0.6)", run: () => app.editor.scaleOf('bottom-right', 0.6) },
      { name: "app.editor.scaleOf({ x: 0, y: 0 }, 1.3)", run: () => app.editor.scaleOf({ x: 0, y: 0 }, 1.3) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
