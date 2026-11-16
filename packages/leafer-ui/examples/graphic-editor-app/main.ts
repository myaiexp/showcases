// Fun: an App with editor: {} gets a tree layer, a sky layer and a graphic editor
import { App, Frame, Rect } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor plugin
import '@leafer-in/viewport'; // optional: wheel and gesture zoom and pan for the tree layer
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'Click a rect to select it, drag to move, pull a handle to resize or rotate, drag on the frame to box-select.',
  });
  const s = stage.preview ? 0.5 : 1;

  const app = stage.own(
    new App({
      view: stage.view,
      fill: '#333',
      editor: {}, // creates app.editor, plus the tree and sky layers
    }),
  );

  const left = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, 60 * s, 60 * s, 140 * s, 140 * s);
  const right = Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, 240 * s, 60 * s, 140 * s, 140 * s);
  app.tree.add(Frame.one({ children: [left, right] }, 20 * s, 20 * s, 460 * s, 320 * s));

  if (stage.preview) {
    // Select, move, resize from a corner, then deselect, all through simulated pointer input.
    const ghost = stage.ghost(app);
    script(stage, async () => {
      left.set({ x: 30, y: 30, width: 70, height: 70, rotation: 0 });
      await ghost.tap(65, 65);
      await stage.wait(400);
      await ghost.drag({ x: 65, y: 65 }, { x: 80, y: 95 }, 600);
      await stage.wait(300);
      // The bottom-right resize handle sits on the selection's corner (now at 115 + 10, 130 + 10).
      await ghost.drag({ x: 125, y: 140 }, { x: 150, y: 165 }, 600);
      await stage.wait(700);
      await ghost.tap(245, 180);
      await stage.wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
