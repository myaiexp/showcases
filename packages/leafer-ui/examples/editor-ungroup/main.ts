// Editor: ungroup() returns a group's children to its parent
import { App, Group } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the group, then ungroup it: its rects are selected and editable one by one.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  let group: Group;
  watch(stage, () => 'selected: ' + app.editor.list.map((r) => r.tag + (r.name ? ' ' + r.name : '')).join(', '));

  const reset = (): void => {
    app.editor.cancel();
    app.tree.clear();
    const [rect1, rect2] = pair(g);
    group = new Group({ editable: true, hitChildren: false, children: [rect1, rect2] });
    app.tree.add(group);
  };
  reset();
  actions(
    stage,
    [
      { name: 'app.editor.select(group)', run: () => app.editor.select(group) },
      { name: 'app.editor.ungroup()', run: () => app.editor.ungroup() },
    ],
    { reset, gap: 1500 },
  );
  return stage.dispose;
};

export default mount;
