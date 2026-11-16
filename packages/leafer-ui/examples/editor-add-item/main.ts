// Editor: addItem() grows the selection one element at a time
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, trio, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button adds one more rect to the selection.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2, rect3] = trio(g);
  app.tree.addMany(rect1, rect2, rect3);
  watch(stage, () => 'selected: ' + app.editor.list.map((r) => r.name).join(' '));

  actions(
    stage,
    [
      { name: 'app.editor.addItem(rect1)', run: () => app.editor.addItem(rect1) },
      { name: 'app.editor.addItem(rect2)', run: () => app.editor.addItem(rect2) },
      { name: 'app.editor.addItem(rect3)', run: () => app.editor.addItem(rect3) },
    ],
    { reset: () => app.editor.cancel(), gap: 1200 },
  );
  return stage.dispose;
};

export default mount;
