// Editor config: hoverStyle restyles the hover outline
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move the pointer over the rects." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { hoverStyle: { stroke: '#e4572e', strokeWidth: 3, fill: 'rgba(228,87,46,0.2)' } } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const ghost = stage.preview ? stage.ghost(app) : null;

  if (ghost) {
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      await ghost.glide(spot(rect1).x, spot(rect1).y, 500);
      await stage.wait(900);
      await ghost.glide(spot(rect2).x, spot(rect2).y, 600);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
