// EditorGroupEvent: GROUP and UNGROUP with their before events
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditorGroupEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, actions, pair } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Group and ungroup the rects." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  let [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const log = logLines(stage, 3);
  for (const type of [EditorGroupEvent.BEFORE_GROUP, EditorGroupEvent.GROUP, EditorGroupEvent.BEFORE_UNGROUP, EditorGroupEvent.UNGROUP]) {
    app.editor.on(type, (e: EditorGroupEvent) => log(e.type + ' target ' + (e.editTarget ? e.editTarget.tag : '-')));
  }
  const reset = (): void => {
    app.editor.cancel();
    app.tree.clear();
    [rect1, rect2] = pair(g);
    app.tree.addMany(rect1, rect2);
  };
  actions(stage, [
    { name: 'app.editor.select([rect1, rect2])', run: () => app.editor.select([rect1, rect2]) },
    { name: 'app.editor.group()', run: () => app.editor.group() },
    { name: 'app.editor.ungroup()', run: () => app.editor.ungroup() },
  ], { reset, gap: 1400 });
  return stage.dispose;
};

export default mount;
