// Editor: leafList and openedGroupList are list objects
import { App, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the group, then double-click a rect inside it, and read both lists." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  const group = new Group({ editable: true, name: 'group', hitChildren: false, children: [rect1, rect2] });
  app.tree.add(group);
  watch(stage, () => 'leafList: length ' + app.editor.leafList.length + ', has(rect2) ' + app.editor.leafList.has(rect2) + '\nopenedGroupList: length ' + app.editor.openedGroupList.length + '\nopenedGroupList.has(group) ' + app.editor.openedGroupList.has(group));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1000);
      await ghost.doubleTap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1400);
      await ghost.tap(130, 185);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
