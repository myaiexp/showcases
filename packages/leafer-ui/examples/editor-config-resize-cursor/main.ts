// Editor config: resizeCursor draws the resize cursor from an SVG
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, cursorTile, keep, solo, spot } from '../../shared/editor-kit.ts';

const RESIZE_SVG = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g transform="rotate({{rotation}},12,12)"><path fill-rule="evenodd" d="M3 11.4L7.5 8.0V10.4H16.5V8.0L21 11.4L16.5 14.9V12.4H7.5V14.9L3 11.4Z" fill="#e4572e"/></g></svg>'; // {{rotation}} is replaced per handle

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover the corner and edge handles (real cursor in the full view)." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {}, resizeCursor: { url: RESIZE_SVG, x: 12, y: 12 } } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;
  const show = cursorTile(stage);

  stage.loop(() => show('resize', app.editor.editBox.enterPoint?.cursor));
  if (ghost) {
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      for (const [fx, fy] of [[1, 1], [0, 0], [1, 0.5]] as const) {
        const p = spot(rect, fx, fy);
        await ghost.glide(p.x, p.y, 500);
        await stage.wait(900);
      }
    });
  }
  return stage.dispose;
};

export default mount;
