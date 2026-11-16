// Editor config: around sets the pivot of resizing
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, pull, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a corner with around unset and set to center." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { around: 'center' } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  variants(stage, 'around', ['none', 'center'], (v) => (restore(), tune(app)({ around: v === 'none' ? undefined : v })), ghost ? async () => {
    await stage.wait(500);
    await pull(app, ghost, rect, [1, 1], [24, 18]);
    await stage.wait(1000);
  } : undefined);
  return stage.dispose;
};

export default mount;
