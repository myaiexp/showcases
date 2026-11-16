// Editor: group() accepts a custom Group instance or JSON
import { App, Box } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, pair } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Group with a Box instance (a tinted panel behind the children) or with a JSON object (opacity).' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  let [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);

  const reset = (): void => {
    app.editor.cancel();
    app.tree.clear();
    [rect1, rect2] = pair(g);
    app.tree.addMany(rect1, rect2);
    app.editor.select([rect1, rect2]);
  };
  actions(
    stage,
    [
      {
        name: 'group(new Box({ fill, cornerRadius }))',
        run: () => app.editor.group(new Box({ fill: 'rgba(50,205,121,0.35)', cornerRadius: 14 })),
      },
      { name: 'group({ opacity: 0.4 })', run: () => (reset(), app.editor.group({ opacity: 0.4 })) },
    ],
    { reset, gap: 1700 },
  );
  app.editor.select([rect1, rect2]);
  return stage.dispose;
};

export default mount;
