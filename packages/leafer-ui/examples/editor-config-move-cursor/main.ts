// Editor config: moveCursor sets the move cursor
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, cursorTile, keep, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the selected rect and pick a moveCursor." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { moveCursor: 'move' } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;
  const show = cursorTile(stage);

  stage.loop(() => show('moveCursor', app.editor.editBox.rect.cursor));
  variants(stage, 'moveCursor', ['move', 'grab', 'crosshair', 'pointer'], (v) => tune(app)({ moveCursor: v }));
  return stage.dispose;
};

export default mount;
