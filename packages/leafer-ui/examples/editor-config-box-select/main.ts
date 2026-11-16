// Editor config: boxSelect hit, includes or off
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pair, spot, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Box-select across part of the left rect and all of the right one under each setting." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { boxSelect: 'hit' } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;
  watch(stage, () => 'selected: ' + (app.editor.list.map((r) => r.name).join(' ') || 'none'));

  variants(stage, 'boxSelect', ['hit', 'includes', false], (v) => (app.editor.cancel(), tune(app)({ boxSelect: v })), ghost ? async () => {
    await stage.wait(400);
    const a = spot(rect1, 0.6, -0.4);
    const b = spot(rect2, 1.15, 1.3);
    await ghost.drag(a, b, 1000);
    await stage.wait(1100);
  } : undefined);
  return stage.dispose;
};

export default mount;
