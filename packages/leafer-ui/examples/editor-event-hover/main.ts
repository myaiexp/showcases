// EditorEvent: HOVER fires when the hovered element changes
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditorEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Move the pointer over the rects." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  const log = logLines(stage, 5, true);

  app.editor.on(EditorEvent.HOVER, (e: EditorEvent) => log('HOVER ' + (app.editor.hoverTarget ? app.editor.hoverTarget.name : 'none') + ' (list ' + e.list.length + ')'));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      ghost.leave();
      await stage.wait(500);
      await ghost.glide(spot(rect1).x, spot(rect1).y, 500);
      await stage.wait(900);
      await ghost.glide(spot(rect2).x, spot(rect2).y, 600);
      await stage.wait(900);
      await ghost.glide(130, 175, 500);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
