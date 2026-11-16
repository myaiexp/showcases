// Editor: select() takes one element or a list
import { App } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor plugin
import '@leafer-in/viewport'; // optional
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the buttons: each one is a call to app.editor.select().' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.add(rect1);
  app.tree.add(rect2);

  actions(
    stage,
    [
      { name: 'app.editor.select(rect2)', run: () => app.editor.select(rect2) },
      { name: 'app.editor.select(rect1)', run: () => app.editor.select(rect1) },
      { name: 'app.editor.select([rect1, rect2])', run: () => app.editor.select([rect1, rect2]) },
    ],
    { reset: () => app.editor.cancel() },
  );
  return stage.dispose;
};

export default mount;
