// Editor: the element proxy takes layout properties for a multiple selection
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, actions, keep, pair, r1, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Press the buttons: they set app.editor.element.x and y." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const k = stage.preview ? 0.5 : 1;
  const restore1 = keep(rect1);
  const restore2 = keep(rect2);
  const reset = (): void => {
    restore1();
    restore2();
    app.editor.select([rect1, rect2]);
  };
  reset();
  watch(stage, () => 'element ' + r1(app.editor.element?.x) + ', ' + r1(app.editor.element?.y));
  actions(stage, [
    { name: 'app.editor.element.x += 60 * k', run: () => (app.editor.element!.x = app.editor.element!.x! + 60 * k) },
    { name: 'app.editor.element.y += 40 * k', run: () => (app.editor.element!.y = app.editor.element!.y! + 40 * k) },
    { name: 'app.editor.element.x -= 60 * k', run: () => (app.editor.element!.x = app.editor.element!.x! - 60 * k) },
  ], { reset });
  return stage.dispose;
};

export default mount;
