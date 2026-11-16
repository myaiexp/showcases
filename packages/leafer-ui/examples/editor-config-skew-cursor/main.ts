// Editor config: skewCursor draws the skew cursor
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, holding, cursorTile, keep, solo, spot } from '../../shared/editor-kit.ts';

const SKEW_SVG = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(90,12,12),rotate({{rotation}},12,12)"><path fill-rule="evenodd" d="M17 10.4L21 10.4L15.5 6V8.4H6V10.4H15.5H17ZM8.5 14.4H7L3 14.4L8.5 18.9V16.4H19V14.4H8.5Z" fill="#1b9e55"/></g></svg>';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hold Ctrl and hover an edge of the rect." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { skewCursor: { url: SKEW_SVG, x: 12, y: 12 } } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;
  const show = cursorTile(stage);

  stage.loop(() => show('skew', app.editor.editBox.enterPoint?.cursor));
  if (ghost) {
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      await holding(app, { ctrlKey: true }, async () => {
        for (const [fx, fy] of [[1, 0.3], [0.3, 1], [0, 0.6]] as const) {
          const p = spot(rect, fx, fy);
          await ghost.glide(p.x, p.y, 500);
          await stage.wait(900);
        }
      });
    });
  }
  return stage.dispose;
};

export default mount;
