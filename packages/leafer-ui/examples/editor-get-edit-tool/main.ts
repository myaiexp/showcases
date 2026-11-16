// Editor: getEditTool() returns the singleton tool instance
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, actions, pair, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the rect and compare the tool instances." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  watch(stage, () => {
    const tool = app.editor.getEditTool('EditTool');
    return 'same as editor.editTool: ' + (tool === app.editor.editTool) + '\nasked twice, one instance: ' + (tool === app.editor.getEditTool('EditTool')) + '\nLineEditTool.config: ' + String(app.editor.getEditTool('LineEditTool').config);
  });
  actions(stage, [{ name: 'app.editor.select(rect1)', run: () => app.editor.select(rect1) }], { reset: () => app.editor.cancel(), gap: 2200 });
  return stage.dispose;
};

export default mount;
