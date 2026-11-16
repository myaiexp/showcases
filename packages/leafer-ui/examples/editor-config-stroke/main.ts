// Editor config: stroke colours the edit box and handles
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a stroke colour." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { stroke: '#836DFF' } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;
  variants(stage, 'stroke', ['#836DFF', '#0d99ff', '#e4572e', '#32cd79'], (v) => tune(app)({ stroke: v }));
  return stage.dispose;
};

export default mount;
