// Editor: innerEditing is true while an inner editor is open
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/text-editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { spot, textBox, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Select the text, double-click it to open the text editor, then click outside.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor());
  watch(stage, () => 'editing: ' + app.editor.editing + '\ninnerEditing: ' + app.editor.innerEditing);

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      const c = spot(text);
      await ghost.tap(c.x, c.y);
      await stage.wait(900);
      await ghost.doubleTap(c.x, c.y);
      await stage.wait(1500);
      await ghost.tap(12, stage.height - 14);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
