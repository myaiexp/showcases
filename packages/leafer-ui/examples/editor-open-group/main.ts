// Editor: openGroup() opens a group the way a double-click does
import { App, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { actions, geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Open the group with openGroup(group), then click a rect inside it to edit that rect alone.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  const group = new Group({ editable: true, hitChildren: false, children: [rect1, rect2] });
  app.tree.add(group);
  watch(stage, () => 'group.hitChildren: ' + group.hitChildren + '\nselected: ' + app.editor.list.map((r) => r.name || r.tag).join(', '));
  const reset = (): void => {
    app.editor.cancel();
    app.editor.closeGroup(group);
  };

  actions(stage, [{ name: 'app.editor.openGroup(group)', run: () => app.editor.openGroup(group) }], { card: false, reset });
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      reset();
      await ghost.tap(spot(rect1).x, spot(rect1).y);
      await stage.wait(1000);
      app.editor.openGroup(group);
      await stage.wait(900);
      await ghost.tap(spot(rect2).x, spot(rect2).y);
      await stage.wait(1400);
    });
  }
  return stage.dispose;
};

export default mount;
