// Editor: removeItem() takes one element out of the selection
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, trio, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'All three start selected; each button removes one.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2, rect3] = trio(g);
  app.tree.addMany(rect1, rect2, rect3);
  watch(stage, () => 'selected: ' + app.editor.list.map((r) => r.name).join(' '));

  actions(
    stage,
    [
      { name: 'app.editor.removeItem(rect3)', run: () => app.editor.removeItem(rect3) },
      { name: 'app.editor.removeItem(rect1)', run: () => app.editor.removeItem(rect1) },
    ],
    { reset: () => app.editor.select([rect1, rect2, rect3]), gap: 1300 },
  );
  return stage.dispose;
};

export default mount;
