// Editor: toTop() raises the selection above its siblings
import { App, Rect } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The orange rect sits under the yellow one; toTop() lifts it above.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const x = Math.round((stage.width - g.size * 1.5) / 2);
  const y = Math.round((stage.height - g.size) / 2) - 8;
  const rect1 = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, x, y, g.size, g.size);
  const rect2 = Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, x + g.size / 2, y, g.size, g.size);
  app.tree.addMany(rect1, rect2);

  actions(stage, [{ name: 'app.editor.toTop()', run: () => app.editor.toTop() }], {
    reset: () => {
      app.tree.addAt(rect1, 0);
      app.editor.select(rect1);
    },
    gap: 1800,
  });
  app.editor.select(rect1);
  return stage.dispose;
};

export default mount;
