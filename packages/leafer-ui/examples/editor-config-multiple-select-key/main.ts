// Editor config: multipleSelectKey chooses the multi-select modifier
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, trio, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click one rect, then Shift-click or Ctrl-click the others." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {
    multipleSelectKey(event) {
      return !!(event.shiftKey || event.ctrlKey); // the default is shiftKey
    },
  } }));
  const [rect1, rect2, rect3] = trio(g);
  app.tree.addMany(rect1, rect2, rect3);
  watch(stage, () => 'selected: ' + app.editor.list.map((r) => r.name).join(' '));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(500);
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(600);
      await ghost.tap(spot(rect2).x, spot(rect2).y, { ctrlKey: true });
      await stage.wait(900);
      await ghost.tap(spot(rect3).x, spot(rect3).y, { shiftKey: true });
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
