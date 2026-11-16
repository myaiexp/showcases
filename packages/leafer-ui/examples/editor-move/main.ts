// Editor: move() shifts the selection by an amount
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button calls app.editor.move(x, y): an incremental move of the selected rect.' });
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
      { name: "app.editor.move(60 * k, 0)", run: () => app.editor.move(60 * k, 0) },
      { name: "app.editor.move(0, 40 * k)", run: () => app.editor.move(0, 40 * k) },
      { name: "app.editor.move(-60 * k, -40 * k)", run: () => app.editor.move(-60 * k, -40 * k) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
