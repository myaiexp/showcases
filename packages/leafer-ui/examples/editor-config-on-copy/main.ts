// Editor config: onCopy lets Alt-drag duplicate the selection
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, pull } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hold Alt and drag a rect: a copy comes along." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {
    onCopy() {
      // clone the selected elements and select the clones
      const list = app.editor.list.map((item) => {
        const cloneItem = item.clone();
        item.parent!.add(cloneItem);
        return cloneItem;
      });
      app.editor.target = list.length > 1 ? list : list[0];
      return true; // required: the copy was made
    },
  } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  app.editor.select(rect1);
  const ghost = stage.preview ? stage.ghost(app) : null;
  if (ghost) {
    script(stage, async () => {
      for (const extra of app.tree.children.slice(2)) extra.remove();
      app.editor.select(rect1);
      rect1.set({ x: g.a.x, y: g.a.y });
      await stage.wait(700);
      await pull(app, ghost, rect1, [0.5, 0.5], [14, 56], { altKey: true }, 1100);
      await stage.wait(1400);
    });
  }
  return stage.dispose;
};

export default mount;
