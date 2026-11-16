// Editor: rotateOf() around a corner or a point
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The pivot is a name such as 'top-left' or a point in box coordinates, so the rect swings around it." });
  const g = geo(stage);
  const k = stage.preview ? 0.5 : 1;
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  rect1.x = (rect1.x ?? 0) + (stage.preview ? 50 : 60);
  const restore = keep(rect1, app);
  app.editor.select(rect1);
  void k;

  actions(
    stage,
    [
      { name: "app.editor.rotateOf('top-left', 30)", run: () => app.editor.rotateOf('top-left', 30) },
      { name: "app.editor.rotateOf('bottom-right', -30)", run: () => app.editor.rotateOf('bottom-right', -30) },
      { name: "app.editor.rotateOf({ x: 0, y: 0 }, 20)", run: () => app.editor.rotateOf({ x: 0, y: 0 }, 20) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
