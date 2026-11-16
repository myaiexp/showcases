// Editor config: skewable switches Ctrl-drag skewing off
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hold Ctrl and drag an edge with skewable on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { skewable: false } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'skewX ' + r1(rect.skewX));
  variants(stage, 'skewable', [false, true], (v) => (restore(), tune(app)({ skewable: v })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 0.3], [0, 26], { ctrlKey: true }, 1000);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
