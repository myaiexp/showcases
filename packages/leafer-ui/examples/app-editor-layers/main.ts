// Advanced: the editor example with explicit tree and sky layers
import { App, Frame, Rect } from 'leafer-ui';
import { Editor } from '@leafer-in/editor'; // the graphic editor plugin
import '@leafer-in/viewport'; // optional: pan and zoom the tree layer
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a rect to select and edit it.', paper: 'transparent' });
  const u = sizer(stage);
  const app = stage.own(
    new App({
      view: stage.view,
      fill: '#333',
      tree: { type: 'design' }, // the content layer
      sky: {}, // a layer above for the editor
    }),
  );
  const left = Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, u(30), u(40), u(100), u(100));
  const right = Rect.one({ editable: true, fill: '#FFE04B', cornerRadius: [0, 20, 20, 0] }, u(170), u(40), u(100), u(100));
  app.tree.add(Frame.one({ children: [left, right] }, u(30), u(20), u(280), u(200))); // the page content
  app.sky.add((app.editor = new Editor())); // the graphic editor lives in the sky layer

  if (stage.preview) {
    // Select the left rect, move it, then resize it from a corner, all through simulated pointer input.
    const ghost = stage.ghost(app);
    script(stage, async () => {
      left.set({ x: u(30), y: u(40) });
      await ghost.tap(u(30 + 30 + 50), u(20 + 40 + 50));
      await stage.wait(400);
      await ghost.drag({ x: u(110), y: u(110) }, { x: u(130), y: u(130) }, 600);
      await stage.wait(700);
      await ghost.tap(u(250), u(60));
      await stage.wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
