// EditorGroupEvent: OPEN and CLOSE when a group is entered
import { App, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditorGroupEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Double-click a rect in the group, then click outside." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  const group = new Group({ editable: true, name: 'group', hitChildren: false, children: [rect1, rect2] });
  app.tree.add(group);
  const log = logLines(stage, 5, true);
  for (const type of [EditorGroupEvent.BEFORE_OPEN, EditorGroupEvent.OPEN, EditorGroupEvent.BEFORE_CLOSE, EditorGroupEvent.CLOSE]) {
    app.editor.on(type, (e: EditorGroupEvent) => log(e.type.replace('editor.', '') + ' ' + e.editTarget.name));
  }
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(rect2).x, spot(rect2).y);
      await stage.wait(800);
      await ghost.doubleTap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1200);
      await ghost.tap(130, 185);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
