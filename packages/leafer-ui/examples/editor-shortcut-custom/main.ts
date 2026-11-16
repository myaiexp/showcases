// Editor shortcut: customise by changing config on key events
import { App, KeyEvent } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Click the rect, press L to toggle lockRatio, then drag a corner." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);

  watch(stage, () => 'lockRatio ' + app.editor.config.lockRatio + '   (press L)\nwidth ' + r1(rect.width) + '  height ' + r1(rect.height));
  app.on(KeyEvent.DOWN, (e: KeyEvent) => {
    if (e.code === 'KeyL') app.editor.config.lockRatio = !app.editor.config.lockRatio; // a custom shortcut
  });
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      restore();
      app.editor.config.lockRatio = false;
      await stage.wait(600);
      await pull(app, ghost, rect, [1, 1], [28, 8], undefined, 800);
      await stage.wait(500);
      restore();
      ghost.key('KeyL');
      await stage.wait(700);
      await pull(app, ghost, rect, [1, 1], [28, 8], undefined, 800);
      await stage.wait(1100);
    });
  }
  return stage.dispose;
};

export default mount;
