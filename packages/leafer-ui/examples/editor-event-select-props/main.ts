// EditorEvent: value, oldValue, list and oldList
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditorEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click, shift-click and click outside and compare list with oldList." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const log = logLines(stage, 5, true);

  const names = (list: { name?: string }[]): string => '[' + list.map((r) => r.name).join(', ') + ']';
  app.editor.on(EditorEvent.SELECT, (e: EditorEvent) => log('list ' + names(e.list) + '  oldList ' + names(e.oldList)));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(900);
      await ghost.tap(spot(rect2).x, spot(rect2).y, { shiftKey: true });
      await stage.wait(900);
      await ghost.tap(130, 185);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
