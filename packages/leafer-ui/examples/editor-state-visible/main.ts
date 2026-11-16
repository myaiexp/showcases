// Editor: visible hides the editor and its interaction
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'With visible = false the edit box is gone and nothing can be clicked into a selection.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  watch(stage, () => 'editor.visible: ' + app.editor.visible + '  editing: ' + app.editor.editing);
  app.editor.select(rect1);

  actions(
    stage,
    [
      { name: 'app.editor.visible = false', run: () => void (app.editor.visible = false) },
      { name: 'app.editor.visible = true', run: () => void (app.editor.visible = true) },
    ],
    { reset: () => (app.editor.visible = true), gap: 1500 },
  );
  return stage.dispose;
};

export default mount;
