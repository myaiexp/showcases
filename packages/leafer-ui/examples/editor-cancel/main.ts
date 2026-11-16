// Editor: cancel() drops the selection
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select both rects, then cancel the selection.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.add(rect1);
  app.tree.add(rect2);
  watch(stage, () => 'selected: ' + app.editor.list.length);

  actions(
    stage,
    [
      { name: 'app.editor.select([rect1, rect2])', run: () => app.editor.select([rect1, rect2]) },
      { name: 'app.editor.cancel()', run: () => app.editor.cancel() },
    ],
    { reset: () => app.editor.cancel(), gap: 1500 },
  );
  return stage.dispose;
};

export default mount;
