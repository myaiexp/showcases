// Editor shortcut: Shift locks a move to one axis
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { label } from '../../shared/basics.ts';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, watch } from '../../shared/editor-kit.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag the rect diagonally, then again holding Shift." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  watch(stage, () => 'x ' + r1(rect.x) + '  y ' + r1(rect.y));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const say = label(stage, '', true);
    script(stage, async () => {
      restore();
      say('drag');
      await stage.wait(600);
      await pull(app, ghost, rect, [0.5, 0.5], [44, 26], undefined, 1000);
      await stage.wait(700);
      restore();
      say('drag with Shift');
      await stage.wait(500);
      await pull(app, ghost, rect, [0.5, 0.5], [44, 26], { shiftKey: true }, 1000);
      await stage.wait(1100);
    });
  }
  return stage.dispose;
};

export default mount;
