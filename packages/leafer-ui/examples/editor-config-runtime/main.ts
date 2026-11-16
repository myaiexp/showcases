// Editor: config changes at runtime, then updateEditTool() applies them
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, solo } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button edits app.editor.config; the edit box redraws once updateEditTool() runs.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const rect = solo(stage, g);
  app.tree.add(rect);
  const reset = (): void => {
    Object.assign(app.editor.config, { stroke: '#836DFF', pointSize: 10, pointRadius: 16 });
    app.editor.select(rect);
    app.editor.updateEditTool();
  };

  actions(
    stage,
    [
      {
        name: "config.stroke = '#e4572e'",
        run: () => {
          app.editor.config.stroke = '#e4572e';
          app.editor.updateEditTool();
        },
      },
      {
        name: 'config.pointSize = 18',
        run: () => {
          app.editor.config.pointSize = 18;
          app.editor.updateEditTool();
        },
      },
      {
        name: 'config.pointRadius = 0',
        run: () => {
          app.editor.config.pointRadius = 0;
          app.editor.updateEditTool();
        },
      },
    ],
    { reset },
  );
  app.editor.select(rect);
  return stage.dispose;
};

export default mount;
