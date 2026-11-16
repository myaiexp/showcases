// Box: resizeChildren scales children and text
import { App, Box } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { toggle, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the box, drag a corner handle, then toggle resizeChildren.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const bx = stage.width / 2 - 70, by = stage.height / 2 - 60;
  const box = new Box({
    x: bx, y: by, width: 140, height: 90, fill: '#4B8BFF', cornerRadius: 12, hitChildren: false, editable: true,
    children: [
      { tag: 'Ellipse', x: 15, y: 20, width: 50, height: 50, fill: '#FEB027' },
      { tag: 'Text', x: 78, y: 32, text: 'Box', fill: 'white', fontSize: 24, resizeFontSize: true },
    ],
  });
  app.tree.add(box);
  const note = caption(stage, app.tree as never);
  const reset = (on: boolean): void => {
    box.set({ x: bx, y: by, width: 140, height: 90, resizeChildren: on });
    box.children[0]!.set({ x: 15, y: 20, width: 50, height: 50 });
    box.children[1]!.set({ x: 78, y: 32, fontSize: 24 });
    note.text = `resizeChildren: ${on}`;
  };
  toggle(stage, 'resizeChildren', false, reset, 100000);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      for (const on of [false, true]) {
        reset(on);
        await ghost.tap(bx + 6, by + 6);
        await stage.wait(700);
        const b = box.getBounds();
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
