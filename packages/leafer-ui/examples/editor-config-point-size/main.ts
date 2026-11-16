// Editor config: pointSize and pointRadius shape the handles
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { drive } from '../../shared/shapes.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide pointSize; pick a radius." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { pointSize: 10, pointRadius: 16 } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  drive(stage, 'pointSize', [6, 26, 1], 10, (v) => tune(app)({ pointSize: v }), 4);
  if (stage.bar) variants(stage, 'pointRadius', [16, 0, 4], (v) => tune(app)({ pointRadius: v }));
  else stage.every(2000, () => tune(app)({ pointRadius: app.editor.config.pointRadius ? 0 : 16 }));
  return stage.dispose;
};

export default mount;
