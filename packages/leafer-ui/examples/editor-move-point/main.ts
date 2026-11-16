// Editor: move() also takes a point object
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "move({ x, y }) moves the selection by the point's x and y, the same incremental move." });
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
      { name: "app.editor.move({ x: 50 * k, y: 30 * k })", run: () => app.editor.move({ x: 50 * k, y: 30 * k }) },
      { name: "app.editor.move({ x: 50 * k, y: -30 * k })", run: () => app.editor.move({ x: 50 * k, y: -30 * k }) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
