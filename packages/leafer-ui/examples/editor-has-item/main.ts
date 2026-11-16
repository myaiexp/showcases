// Editor: hasItem() asks whether an element is selected
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a rect (shift-click adds the other): the readout asks hasItem() for each.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.add(rect1);
  app.tree.add(rect2);
  watch(stage, () => 'hasItem(rect1): ' + app.editor.hasItem(rect1) + '\nhasItem(rect2): ' + app.editor.hasItem(rect2));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(900);
      await ghost.tap(spot(rect2).x, spot(rect2).y, { shiftKey: true });
      await stage.wait(1100);
      await ghost.tap(130, 180);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
