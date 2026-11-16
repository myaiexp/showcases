// Editor: scaleOf() to an absolute scale
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "With editSize 'scale' the element's scale changes; divide the target scale by the current one to reach it." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { editSize: 'scale' } }));
  const [rect1, rect2] = pair(g, {}, { rotation: 10 });
  app.tree.addMany(rect1, rect2);
  const restore = keep(rect1, app);
  app.editor.select(rect1);
  watch(stage, () => 'rect1.scaleX: ' + Math.round(rect1.scaleX! * 100) / 100);

  actions(
    stage,
    [
      { name: "scaleOf('center', 1.5 / element.scale)", run: () => app.editor.scaleOf('center', 1.5 / (app.editor.element!.scale as number)) },
      { name: "scaleOf('center', 0.7 / element.scale)", run: () => app.editor.scaleOf('center', 0.7 / (app.editor.element!.scale as number)) },
      { name: "scaleOf('center', 1 / element.scale)", run: () => app.editor.scaleOf('center', 1 / (app.editor.element!.scale as number)) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
