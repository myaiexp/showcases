// Editor config: rotateKey picks the key that turns handles into rotation
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, keep, pull, r1, solo, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Alt-drag a corner handle to rotate; a Ctrl-drag now resizes." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {
    rotateKey(event) {
      return !!event.altKey; // the default is ctrlKey
    },
  } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  watch(stage, () => 'rotation ' + r1(rect.rotation) + '  width ' + r1(rect.width));
  if (ghost) {
    script(stage, async () => {
      restore();
      await stage.wait(600);
      await pull(app, ghost, rect, [1, 1], [-20, 34], { altKey: true }, 1000);
      await stage.wait(900);
      restore();
      await stage.wait(500);
      await pull(app, ghost, rect, [1, 1], [-20, 34], { ctrlKey: true }, 1000);
      await stage.wait(900);
    });
  }
  return stage.dispose;
};

export default mount;
