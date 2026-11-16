// Editor config: continuousSelect adds with plain clicks
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pair, spot, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the rects one after another with the option on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { continuousSelect: true } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;
  watch(stage, () => 'selected: ' + (app.editor.list.map((r) => r.name).join(' ') || 'none'));

  variants(stage, 'continuousSelect', [true, false], (v) => (app.editor.cancel(), tune(app)({ continuousSelect: v })), ghost ? async () => {
    await stage.wait(400);
    await ghost.tap(spot(rect1).x, spot(rect1).y);
    await stage.wait(500);
    await ghost.tap(spot(rect2).x, spot(rect2).y);
    await stage.wait(1200);
  } : undefined);
  return stage.dispose;
};

export default mount;
