// Editor: hoverTarget is the element under the pointer
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the pointer over the rects: the editor outlines the hovered one and sets app.editor.hoverTarget.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  watch(stage, () => 'hoverTarget: ' + (app.editor.hoverTarget ? app.editor.hoverTarget.name : 'none'));

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      ghost.leave();
      await stage.wait(600);
      await ghost.glide(spot(rect1).x, spot(rect1).y, 600);
      await stage.wait(1000);
      await ghost.glide(spot(rect2).x, spot(rect2).y, 700);
      await stage.wait(1000);
      await ghost.glide(130, 170, 600);
      await stage.wait(800);
    });
  }
  return stage.dispose;
};

export default mount;
