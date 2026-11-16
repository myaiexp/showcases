// Editor config: hideResizeLines removes the edge resize hit areas
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the right edge (not a corner handle) with hideResizeLines on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { hideResizeLines: false } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'x ' + r1(rect.x) + '  width ' + r1(rect.width));
  variants(stage, 'hideResizeLines', [false, true], (v) => (restore(), tune(app)({ hideResizeLines: v })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 0.3], [30, 0]);
    await stage.wait(1000);
  } : undefined);
  return stage.dispose;
};

export default mount;
