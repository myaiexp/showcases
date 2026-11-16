// Editor: rotateOf() to an absolute angle
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, keep, pair, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'To reach a target angle, rotate by the target minus the current rotation, as the docs do.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g, {}, { rotation: 10 });
  app.tree.addMany(rect1, rect2);
  const restore = keep(rect1, app);
  app.editor.select(rect1);
  watch(stage, () => "rect1.rotation: " + Math.round(rect1.rotation!));

  actions(
    stage,
    [
      { name: "rotateOf('center', 45 - rect1.rotation)", run: () => app.editor.rotateOf('center', 45 - rect1.rotation!) },
      { name: "rotateOf('center', 90 - rect1.rotation)", run: () => app.editor.rotateOf('center', 90 - rect1.rotation!) },
      { name: "rotateOf('center', 0 - rect1.rotation)", run: () => app.editor.rotateOf('center', 0 - rect1.rotation!) },
    ],
    { reset: restore },
  );
  return stage.dispose;
};

export default mount;
