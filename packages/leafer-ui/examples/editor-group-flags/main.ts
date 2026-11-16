// Editor: a new group gets editable true and hitChildren false
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Group the rects and read the flags editor.group() sets on the result.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  let [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  watch(stage, () => {
    const group = app.editor.list[0];
    if (!group || !group.isBranch) return 'group: none yet';
    return 'group.editable: ' + group.editable + '\ngroup.hitChildren: ' + (group as unknown as { hitChildren: boolean }).hitChildren;
  });

  const reset = (): void => {
    app.editor.cancel();
    app.tree.clear();
    [rect1, rect2] = pair(g);
    app.tree.addMany(rect1, rect2);
  };
  actions(
    stage,
    [
      { name: 'app.editor.select([rect1, rect2])', run: () => app.editor.select([rect1, rect2]) },
      { name: 'const group = app.editor.group()', run: () => app.editor.group() },
    ],
    { reset, gap: 1500 },
  );
  return stage.dispose;
};

export default mount;
