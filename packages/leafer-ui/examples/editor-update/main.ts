// Editor: update() redraws the edit box after a config change
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Setting config.middlePoint adds the middle handles once update() runs.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  app.editor.select(rect1);

  actions(
    stage,
    [
      {
        name: 'config.middlePoint = {}; app.editor.update()',
        run: () => {
          app.editor.config.middlePoint = {}; // show the middle control points
          app.editor.update();
        },
      },
    ],
    {
      reset: () => {
        app.editor.config.middlePoint = undefined;
        app.editor.select(rect2);
        app.editor.select(rect1);
      },
      gap: 2000,
    },
  );
  return stage.dispose;
};

export default mount;
