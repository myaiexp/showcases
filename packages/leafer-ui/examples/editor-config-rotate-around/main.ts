// Editor config: rotateAround sets the pivot of rotation
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Ctrl-drag a corner handle to rotate; change the pivot with the select." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { rotateAround: 'center' } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  variants(stage, 'rotateAround', ['center', 'top-left', 'bottom-right'], (v) => (restore(), tune(app)({ rotateAround: v })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 1], [-20, 36], { ctrlKey: true }, 1100);
    await stage.wait(800);
  } : undefined);
  return stage.dispose;
};

export default mount;
