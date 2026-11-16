// Box: textBox lets the editor edit its Text
import { App, Box } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport';
import '@leafer-in/text-editor'; // double-click text editing
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the box, then double-click it to edit the text.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const box = new Box({
    x: stage.width / 2 - 100, y: stage.height / 2 - 24, fill: '#FF4B4B', cornerRadius: 20,
    textBox: true, hitChildren: false, editable: true, resizeChildren: true,
    children: [{ tag: 'Text', text: 'Welcome to LeaferJS', fill: 'black', padding: [10, 20], textAlign: 'left', verticalAlign: 'top', fontSize: stage.preview ? 16 : 22 }],
  });
  app.tree.add(box);
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      const { x, y, width, height } = box.getBounds();
      const c = { x: x! + width! / 2, y: y! + height! / 2 };
      await ghost.tap(c.x, c.y);
      await stage.wait(800);
      await ghost.doubleTap(c.x, c.y);
      await stage.wait(1400);
      await ghost.tap(8, 8);
      await stage.wait(700);
    });
  }

  return stage.dispose;
};

export default mount;
