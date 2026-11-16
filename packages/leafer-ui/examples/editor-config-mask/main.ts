// Editor config: mask darkens everything but the selection
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pair, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a mask." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { mask: true } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  app.editor.select(rect1);
  variants(stage, 'mask', ['false', 'true', 'rgba(0,0,0,0.8)', 'rgba(228,87,46,0.5)'], (v) => tune(app)({ mask: v === 'false' ? false : v === 'true' ? true : v }));
  return stage.dispose;
};

export default mount;
