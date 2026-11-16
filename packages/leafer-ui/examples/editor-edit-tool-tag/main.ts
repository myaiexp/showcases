// Editor: editTool is picked per element, LineEditTool for a Line
import { App, Line } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, solo, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the rect, then the line: the editor loads a different edit tool for each.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const rect = solo(stage, g, { fill: '#FEB027', cornerRadius: 12 });
  rect.x = stage.preview ? 24 : 120;
  const line = Line.one({ editable: true, stroke: '#32cd79', strokeWidth: stage.preview ? 8 : 12 }, stage.preview ? 130 : 400, rect.y! + g.size / 2, stage.preview ? 100 : 220);
  app.tree.addMany(rect, line);
  watch(stage, () => 'editTool: ' + (app.editor.editTool?.tag ?? 'none'));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      await ghost.tap(spot(rect).x, spot(rect).y);
      await stage.wait(1300);
      await ghost.tap(spot(line).x, spot(line).y);
      await stage.wait(1300);
      await ghost.tap(130, 185);
      await stage.wait(700);
    });
  }
  return stage.dispose;
};

export default mount;
