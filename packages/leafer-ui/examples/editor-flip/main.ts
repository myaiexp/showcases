// Editor: flip() mirrors the selection along an axis
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "flip('x') and flip('y') mirror the selected rect in the world coordinate system; its rounded left side switches sides." });
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
      { name: "app.editor.flip('x')", run: () => app.editor.flip('x') },
      { name: "app.editor.flip('y')", run: () => app.editor.flip('y') },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
