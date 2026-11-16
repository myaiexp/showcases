// Editor config: hover shows or hides the hover outline
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, pair, spot, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move the pointer over the rects with hover on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { hover: true } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  variants(stage, 'hover', [true, false], (v) => tune(app)({ hover: v }), ghost ? async () => {
    ghost.leave();
    await stage.wait(300);
    await ghost.glide(spot(rect1).x, spot(rect1).y, 500);
    await stage.wait(700);
    await ghost.glide(spot(rect2).x, spot(rect2).y, 600);
    await stage.wait(800);
  } : undefined);
  return stage.dispose;
};

export default mount;
