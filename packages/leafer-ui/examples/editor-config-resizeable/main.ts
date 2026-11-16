// Editor config: resizeable switches resizing on and off
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Try the drag with resizeable on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { resizeable: false } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'x ' + r1(rect.x) + '  y ' + r1(rect.y) + '\nwidth ' + r1(rect.width) + '  height ' + r1(rect.height));
  variants(stage, 'resizeable', [false, true], (v) => (restore(), tune(app)({ resizeable: v })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 1], [24, 18]);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
