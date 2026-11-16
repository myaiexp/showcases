// Editor config: selectedPathType picks the selected outline path
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Switch selectedPathType." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { selectedPathType: 'render-path' } }));
  const rect = solo(stage, g, { fill: '#FEB027', stroke: '#32cd79', strokeWidth: stage.preview ? 8 : 16, cornerRadius: stage.preview ? 24 : 40 });
  app.tree.add(rect);
  app.editor.select(rect);
  variants(stage, 'selectedPathType', ['render-path', 'path', 'box', 'stroke'], (v) => tune(app)({ selectedPathType: v, selectedStyle: { stroke: '#e4572e', strokeWidth: 3 } }));
  return stage.dispose;
};

export default mount;
