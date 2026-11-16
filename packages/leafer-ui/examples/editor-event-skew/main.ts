// EditorSkewEvent: SKEW reports skewX and skewY
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { EditorSkewEvent } from '@leafer-in/editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pair, pull, r1 } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hold Ctrl and drag an edge." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);
  app.editor.select(rect1);
  const log = logLines(stage, 5, true);
  const restore = keep(rect1, app);

  app.editor.on(EditorSkewEvent.SKEW, (e: EditorSkewEvent) => log('SKEW ' + r1(e.skewX) + ', ' + r1(e.skewY)));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      restore();
      await stage.wait(600);
      await pull(app, ghost, rect1, [0.4, 0], [24, 0], { ctrlKey: true }, 1000);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
