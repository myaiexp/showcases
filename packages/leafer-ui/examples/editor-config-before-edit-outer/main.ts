// Editor config: beforeEditOuter can refuse the edit tool
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select each rect: the yellow one shows no edit box." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {
    beforeEditOuter({ target }) {
      return target !== rect2; // false cancels the edit tool
    },
  } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'editTool: ' + (app.editor.editTool?.tag ?? 'none'));
  if (ghost) {
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(500);
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(1100);
      await ghost.tap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1300);
    });
  }
  return stage.dispose;
};

export default mount;
