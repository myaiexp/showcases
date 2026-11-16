// Editor: buttons holds custom buttons, here a fixed Remove button
import { App, Box, PointerEvent } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pair, spot } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select a rect and press its Remove button: it deletes the selection. buttonsFixed keeps the button upright.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { buttonsFixed: true } }));
  const [rect1, rect2] = pair(g);
  app.tree.addMany(rect1, rect2);

  const button = Box.one({
    around: 'center',
    fill: '#FEB027',
    cornerRadius: 20,
    cursor: 'pointer',
    children: [{ tag: 'Text', fill: 'white', text: 'Remove', padding: stage.preview ? [4, 8] : [7, 10], fontSize: stage.preview ? 12 : 16 }],
  });
  app.editor.buttons.add(button);
  button.on(PointerEvent.TAP, () => {
    app.editor.list.forEach((rect) => rect.remove()); // delete the selected elements
    app.editor.target = null as never; // and deselect
  });
  app.editor.select(rect1);

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      if (!rect1.parent) app.tree.addAt(rect1, 0);
      app.editor.select(rect1);
      await stage.wait(1200);
      const p = spot(button);
      await ghost.tap(p.x, p.y);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
