// Editor config: arrowStep is the arrow-key distance
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the rect, press the arrow keys and pick a step." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { arrowStep: 1 } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rect.x ' + r1(rect.x));
  variants(stage, 'arrowStep', [1, 6, 15], (v) => (restore(), tune(app)({ arrowStep: v })), ghost ? async () => {
    await stage.wait(500);
    for (let i = 0; i < 4; i++) {
      ghost.key('ArrowRight');
      await stage.wait(300);
    }
    await stage.wait(800);
  } : undefined);
  return stage.dispose;
};

export default mount;
