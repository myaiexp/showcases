// Editor config: rotateCursor draws the rotate cursor
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, cursorTile, keep, solo, spot } from '../../shared/editor-kit.ts';

const ROTATE_SVG = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="rotate(135,12,12),rotate({{rotation}},12,12)"><path fill-rule="evenodd" d="M17 3L20.4 7.5H17.9C17.7 13.1 13.1 17.7 7.5 17.9V20.4L3 17L7.5 13.5V15.9C12.0 15.7 15.7 12.0 15.9 7.5H13.5L17 3Z" fill="#2a7de1"/></g></svg>';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover just outside a corner." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { rotateCursor: { url: ROTATE_SVG, x: 12, y: 12 } } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;
  const show = cursorTile(stage);

  stage.loop(() => show('rotate', app.editor.editBox.enterPoint?.cursor));
  if (ghost) {
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      for (const [fx, fy, dx, dy] of [[1, 1, 13, 13], [0, 0, -13, -13], [1, 0, 13, -13]] as const) {
        const p = spot(rect, fx, fy);
        await ghost.glide(p.x + dx, p.y + dy, 500);
        await stage.wait(900);
      }
    });
  }
  return stage.dispose;
};

export default mount;
