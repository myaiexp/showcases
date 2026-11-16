// Editor: closeGroup() puts an opened group back to one unit
import { App, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The group starts open with a child selected; closeGroup(group) makes it one unit again.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  const group = new Group({ editable: true, hitChildren: false, children: [rect1, rect2] });
  app.tree.add(group);
  watch(stage, () => 'opened groups: ' + app.editor.openedGroupList.length + '\ngroup.hitChildren: ' + group.hitChildren);

  const reset = (): void => {
    app.editor.cancel();
    app.editor.openGroup(group);
    app.editor.select(rect2);
  };
  reset();
  actions(stage, [{ name: 'app.editor.closeGroup(group)', run: () => app.editor.closeGroup(group) }], { reset, gap: 1800 });
  void spot;
  return stage.dispose;
};

export default mount;
