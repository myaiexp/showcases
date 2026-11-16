// Frame: resizeChildren in the editor
import { App, Frame } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { toggle, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the frame, drag a corner handle, then toggle resizeChildren.', paper: 'transparent' });
  const app = stage.own(new App({ view: stage.view, editor: {}, fill: '#333' }));

  const fx = stage.width / 2 - 70, fy = stage.height / 2 - 60;
  const frame = new Frame({ x: fx, y: fy, width: 140, height: 100, hitChildren: false, editable: true, children: [
    { tag: 'Ellipse', x: 20, y: 20, width: 60, height: 60, fill: '#32cd79' },
    { tag: 'Rect', x: 80, y: 40, width: 40, height: 40, fill: '#FEB027' },
  ] });
  app.tree.add(frame);
  const note = caption(stage, app.tree as never);
  const reset = (on: boolean): void => {
    frame.set({ x: fx, y: fy, width: 140, height: 100, resizeChildren: on });
    frame.children[0]!.set({ x: 20, y: 20, width: 60, height: 60 });
    frame.children[1]!.set({ x: 80, y: 40, width: 40, height: 40 });
    note.text = `resizeChildren: ${on}`;
  };
  toggle(stage, 'resizeChildren', false, reset, 100000);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      for (const on of [false, true]) {
        reset(on);
        await ghost.tap(fx + 6, fy + 6);
        await stage.wait(700);
        const b = frame.getBounds();
        const px = b.x! + b.width!, py = b.y! + b.height!; // the bottom-right handle
        await ghost.drag({ x: px, y: py }, { x: px + 40, y: py + 30 }, 700);
        await stage.wait(1100);
        await ghost.tap(8, 8);
      }
    });
  }

  return stage.dispose;
};

export default mount;
