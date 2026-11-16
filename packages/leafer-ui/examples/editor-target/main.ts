// Editor: target is the settable selection
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Assigning app.editor.target selects; null clears.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.add(rect1);
  app.tree.add(rect2);
  watch(stage, () => 'editing: ' + app.editor.editing + '  single: ' + app.editor.single + '  multiple: ' + app.editor.multiple);

  actions(
    stage,
    [
      { name: 'app.editor.target = rect1', run: () => void (app.editor.target = rect1) },
      { name: 'app.editor.target = [rect1, rect2]', run: () => void (app.editor.target = [rect1, rect2]) },
      { name: 'app.editor.target = null', run: () => void (app.editor.target = null as never) },
    ],
    { reset: () => void (app.editor.target = null as never) },
  );
  return stage.dispose;
};

export default mount;
