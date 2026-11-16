// Editor config: flipable lets a handle drag past the opposite edge
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the right-edge handle across the rect with flipable on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { flipable: false, middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'width ' + r1(rect.width) + '  scaleX ' + r1(rect.scaleX as number));
  variants(stage, 'flipable', [false, true], (v) => (restore(), tune(app)({ flipable: v })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 0.5], [-g.size - 24, 0], undefined, 1200);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
