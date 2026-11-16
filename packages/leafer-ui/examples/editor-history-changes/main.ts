// Editor history: PropertyEvent and ChildEvent on the tree
import { App, type IUI } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { ChildEvent, PropertyEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pair, pull, r1 } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag, resize and delete (Remove button) and watch the change log." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  app.editor.select(rect1);
  const log = logLines(stage, 5, true);
  app.tree.on(PropertyEvent.CHANGE, (e: PropertyEvent) => log('change ' + (e.target as IUI).name + '.' + e.attrName + ' ' + r1(Number(e.oldValue)) + ' -> ' + r1(Number(e.newValue))));
  app.tree.on(ChildEvent.ADD, (e: ChildEvent) => log('add ' + (e.child as IUI).name));
  app.tree.on(ChildEvent.REMOVE, (e: ChildEvent) => log('remove ' + (e.child as IUI).name));
  const restore = keep(rect1, app);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      restore();
      if (!rect2.parent) app.tree.add(rect2);
      app.editor.select(rect1);
      await stage.wait(700);
      await pull(app, ghost, rect1, [0.5, 0.5], [16, 12], undefined, 800);
      await stage.wait(800);
      rect2.remove();
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
