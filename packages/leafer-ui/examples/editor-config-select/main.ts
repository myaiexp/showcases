// Editor config: select decides press or tap selects
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pair, pull, r1, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag an unselected rect with each setting." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { select: 'press' } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rect1.x ' + r1(rect1.x) + '  selected: ' + (app.editor.list.map((r) => r.name).join(' ') || 'none'));
  const home = { x: g.a.x, y: g.a.y };
  variants(stage, 'select', ['press', 'tap'], (v) => (rect1.set(home), app.editor.cancel(), tune(app)({ select: v })), ghost ? async () => {
    await stage.wait(400);
    await pull(app, ghost, rect1, [0.5, 0.5], [30, 40]);
    await stage.wait(1200);
  } : undefined);
  return stage.dispose;
};

export default mount;
