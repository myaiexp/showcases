// TextEditor: multi-line text
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport'; // the viewport plugin (optional)
import '@leafer-in/text-editor'; // the text editor: double-click a Text to edit it
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { spot, textBox } from '../../shared/editor-kit.ts';
import { typeInto } from '../../shared/plugin-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Select the text, double-click it to edit, click outside to finish." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const { x, y, width, fontSize } = textBox(stage);

  const text = Text.one(
    {
      text: "First line\nSecond line\nThird line",
      editable: true, // the editor can select it, and double-click opens the text editor
      fill: '#c98a00',
      fontSize,
      
    },
    x,
    y,
    width,
  );
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor()); // the inner editor listens on window until closed

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      const c = spot(text);
      await stage.wait(500);
      await ghost.tap(c.x, c.y);
      await stage.wait(700);
      await ghost.doubleTap(c.x, c.y); // opens the text editor
      await stage.wait(900);
      typeInto(app.editor, "First line\nSecond line\nA new third line\nAnd a fourth"); // what keystrokes would do
      await stage.wait(1300);
      await ghost.tap(12, stage.height - 14); // click outside: done
      await stage.wait(900);
      text.text = "First line\nSecond line\nThird line";
      app.editor.cancel();
    });
  }

  return stage.dispose;
};

export default mount;
