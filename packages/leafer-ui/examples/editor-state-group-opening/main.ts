// Editor: groupOpening is true while a group is open for editing
import { App, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the group, then double-click a rect inside it to open the group; click outside to close it.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  const group = new Group({ editable: true, hitChildren: false, children: [rect1, rect2] });
  app.tree.add(group);
  watch(stage, () => 'groupOpening: ' + app.editor.groupOpening + '\nselected: ' + app.editor.list.map((r) => r.tag).join(', '));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await ghost.tap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1000);
      await ghost.doubleTap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1400);
      await ghost.tap(130, 185);
      await stage.wait(1100);
    });
  }
  return stage.dispose;
};

export default mount;
