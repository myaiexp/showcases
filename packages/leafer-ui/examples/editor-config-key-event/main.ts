// Editor config: keyEvent turns arrow-key movement on and off
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, r1, solo, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the rect, then press the arrow keys with keyEvent on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { keyEvent: true } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rect.x ' + r1(rect.x));
  variants(stage, 'keyEvent', [true, false], (v) => (restore(), tune(app)({ keyEvent: v })), ghost ? async () => {
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
