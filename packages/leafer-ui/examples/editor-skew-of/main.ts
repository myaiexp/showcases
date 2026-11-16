// Editor: skewOf() slants the selection
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'skewOf(origin, skewX, skewY) adds a skew in degrees around the origin.' });
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
      { name: "app.editor.skewOf('center', 25)", run: () => app.editor.skewOf('center', 25) },
      { name: "app.editor.skewOf('center', 0, 20)", run: () => app.editor.skewOf('center', 0, 20) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
