// Editor: rotateOf() turns the selection by an angle
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "rotateOf('center', 30) adds 30 degrees each call, around the element's center." });
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
      { name: "app.editor.rotateOf('center', 30)", run: () => app.editor.rotateOf('center', 30) },
      { name: "app.editor.rotateOf('center', 30)", run: () => app.editor.rotateOf('center', 30) },
      { name: "app.editor.rotateOf('center', -75)", run: () => app.editor.rotateOf('center', -75) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
