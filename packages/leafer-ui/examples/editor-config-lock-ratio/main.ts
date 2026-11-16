// Editor config: lockRatio keeps the aspect ratio
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a corner and a middle-edge handle under each lockRatio setting." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { lockRatio: true, middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'width ' + r1(rect.width) + '  height ' + r1(rect.height));
  variants(stage, 'lockRatio', [true, 'corner', false], (v) => (restore(), tune(app)({ lockRatio: v })), ghost ? async () => {
    await stage.wait(400);
    await pull(app, ghost, rect, [1, 1], [24, 8], undefined, 700);
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 0.5], [20, 0], undefined, 700);
    await stage.wait(700);
  } : undefined);
  return stage.dispose;
};

export default mount;
