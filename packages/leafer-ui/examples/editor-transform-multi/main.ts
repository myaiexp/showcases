// Editor: transform methods act on a multiple selection as one
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both rects are selected: rotateOf() and scaleOf() turn and scale them around their shared center.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const restore1 = keep(rect1);
  const restore2 = keep(rect2);
  const reset = (): void => {
    restore1();
    restore2();
    app.editor.select([rect1, rect2]);
  };
  reset();

  actions(
    stage,
    [
      { name: "app.editor.rotateOf('center', 40)", run: () => app.editor.rotateOf('center', 40) },
      { name: "app.editor.scaleOf('center', 0.6)", run: () => app.editor.scaleOf('center', 0.6) },
      { name: 'app.editor.move(0, 30)', run: () => app.editor.move(0, 30) },
    ],
    { reset },
  );
  return stage.dispose;
};

export default mount;
