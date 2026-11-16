// Editor: updateEditBox() refits the box after the selection moved
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, trio } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Align the selected rects by hand, then call updateEditBox() so the multi-selection box fits them.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2, rect3] = trio(g);
  app.tree.addMany(rect1, rect2, rect3);
  const restore = [keep(rect1), keep(rect2), keep(rect3)];
  const reset = (): void => {
    restore.forEach((r) => r());
    app.editor.select([rect1, rect2, rect3]);
  };
  reset();

  actions(
    stage,
    [
      { name: 'rect3.x = rect1.x; rect3.y = rect1.y', run: () => (rect3.x = rect1.x, (rect3.y = rect1.y)) },
      { name: 'rect2.y = rect1.y + 30', run: () => (rect2.y = rect1.y! + 30) },
      { name: 'app.editor.updateEditBox()', run: () => app.editor.updateEditBox() },
    ],
    { reset },
  );
  return stage.dispose;
};

export default mount;
