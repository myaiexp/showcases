// Editor config: beforeSelect can swap the selected element
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the orange rect and see the yellow one get selected." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {
    beforeSelect(data) {
      if (data.target === rect1) return rect2; // select rect2 instead
      return true;
    },
  } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'selected: ' + (app.editor.list.map((r) => r.name).join(' ') || 'none'));
  if (ghost) {
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(500);
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(1500);
    });
  }
  return stage.dispose;
};

export default mount;
