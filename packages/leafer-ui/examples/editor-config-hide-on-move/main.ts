// Editor config: hideOnMove hides the edit box while moving
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the rect with hideOnMove on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { hideOnMove: true } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  variants(stage, 'hideOnMove', [true, false], (v) => (restore(), tune(app)({ hideOnMove: v })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [0.5, 0.5], [40, 18], undefined, 1300);
    await stage.wait(800);
  } : undefined);
  return stage.dispose;
};

export default mount;
