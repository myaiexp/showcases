// Editor config: editBoxType stroke frames the stroke bounds
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Switch editBoxType and compare the frame with the stroke." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { editBoxType: 'box' } }));
  const rect = solo(stage, g, { fill: '#FEB027', stroke: '#32cd79', strokeWidth: stage.preview ? 12 : 24, cornerRadius: 0 });
  app.tree.add(rect);
  app.editor.select(rect);
  variants(stage, 'editBoxType', ['box', 'stroke'], (v) => tune(app)({ editBoxType: v }));
  return stage.dispose;
};

export default mount;
