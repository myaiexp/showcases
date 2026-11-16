// Editor config: rotateGap snaps rotation to steps
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Ctrl-drag a corner handle slowly and watch the angle jump between multiples of the gap." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { rotateGap: 45 } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rotation ' + r1(rect.rotation));
  variants(stage, 'rotateGap', [15, 45, 90], (v) => (restore(), tune(app)({ rotateGap: v })), ghost ? async () => {
    await stage.wait(400);
    await pull(app, ghost, rect, [1, 1], [-30, 30], { ctrlKey: true }, 1200);
    await stage.wait(900);
  } : undefined);
  return stage.dispose;
};

export default mount;
