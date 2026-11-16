// Editor: skewOf() to an absolute skew
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Skew by the target skewX minus the current skewX to land exactly on it.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g, {}, { rotation: 10 });
  app.tree.addMany(rect1, rect2);
  const restore = keep(rect1, app);
  app.editor.select(rect1);
  watch(stage, () => 'rect1.skewX: ' + Math.round(rect1.skewX!));

  actions(
    stage,
    [
      { name: "skewOf('center', 30 - element.skewX)", run: () => app.editor.skewOf('center', 30 - app.editor.element!.skewX!) },
      { name: "skewOf('center', -20 - element.skewX)", run: () => app.editor.skewOf('center', -20 - app.editor.element!.skewX!) },
      { name: "skewOf('center', 0 - element.skewX)", run: () => app.editor.skewOf('center', 0 - app.editor.element!.skewX!) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
