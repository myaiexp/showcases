// Editor config: rect styles the edit box frame
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, solo } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the rect." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { rect: { stroke: '#e4572e', strokeWidth: 2, dashPattern: [5, 3], fill: 'rgba(228,87,46,0.08)' } } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;
  return stage.dispose;
};

export default mount;
