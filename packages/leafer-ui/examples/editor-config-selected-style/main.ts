// Editor config: selectedStyle outlines each selected element
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select both rects." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { selectedStyle: { stroke: '#e4572e', strokeWidth: 3, fill: 'rgba(228,87,46,0.18)' } } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  app.editor.select([rect1, rect2]);
  return stage.dispose;
};

export default mount;
