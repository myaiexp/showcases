// Editor shortcut: Ctrl and an edge drag skews
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { label } from '../../shared/basics.ts';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the right edge, then drag it again holding Ctrl." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  watch(stage, () => 'skewY ' + r1(rect.skewY) + '  height ' + r1(rect.height));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const say = label(stage, '', true);
    script(stage, async () => {
      restore();
      say('drag');
      await stage.wait(600);
      await pull(app, ghost, rect, [1, 0.3], [0, 24], undefined, 1000);
      await stage.wait(700);
      restore();
      say('drag with Ctrl');
      await stage.wait(500);
      await pull(app, ghost, rect, [1, 0.3], [0, 24], { ctrlKey: true }, 1000);
      await stage.wait(1100);
    });
  }
  return stage.dispose;
};

export default mount;
