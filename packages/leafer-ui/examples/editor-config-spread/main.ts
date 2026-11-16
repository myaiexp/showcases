// Editor config: spread pushes the edit box outward
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { drive } from '../../shared/shapes.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, solo, tune } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide spread." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { spread: 0 } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;
  drive(stage, 'spread', [0, 30, 1], 0, (v) => tune(app)({ spread: v }), 4);
  return stage.dispose;
};

export default mount;
