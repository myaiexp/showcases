// Editor: group() merges the selected elements into one Group
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select both rects, then group them: the selection becomes the new Group.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  let [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  watch(stage, () => 'selected: ' + app.editor.list.map((r) => r.tag).join(', '));

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
      { name: 'app.editor.group()', run: () => app.editor.group() },
    ],
    { reset, gap: 1500 },
  );
  return stage.dispose;
};

export default mount;
