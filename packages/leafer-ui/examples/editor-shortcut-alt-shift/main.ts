// Editor shortcut: Alt and Shift combine
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { label } from '../../shared/basics.ts';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a corner handle holding Alt and Shift." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  watch(stage, () => 'width ' + r1(rect.width) + '  height ' + r1(rect.height) + '  x ' + r1(rect.x));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const say = label(stage, '', true);
    script(stage, async () => {
      restore();
      say('drag');
      await stage.wait(600);
      await pull(app, ghost, rect, [1, 1], [30, 8], undefined, 1000);
      await stage.wait(700);
      restore();
      say('drag with Alt + Shift');
      await stage.wait(500);
      await pull(app, ghost, rect, [1, 1], [30, 8], { altKey: true, shiftKey: true }, 1000);
      await stage.wait(1100);
    });
  }
  return stage.dispose;
};

export default mount;
