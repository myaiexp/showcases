// Editor config: editSize font-size on the corner handles
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/text-editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, pull, r1, textBox, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Drag a corner handle to change the font size and an edge handle to change the width." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { editSize: 'size', point: { editConfig: { editSize: 'font-size' } } } }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  app.editor.select(text);
  watch(stage, () => 'fontSize ' + r1(text.fontSize as number) + '  width ' + r1(text.width));
  if (stage.preview) {
    const ghost = stage.ghost(app);
    const home = { x, y, width, fontSize };
    script(stage, async () => {
      text.set(home);
      await stage.wait(700);
      await pull(app, ghost, text, [1, 1], [30, 24]);
      await stage.wait(1000);
      text.set(home);
      await stage.wait(500);
      await pull(app, ghost, text, [1, 0.5], [-26, 0]);
      await stage.wait(1000);
    });
  }
  return stage.dispose;
};

export default mount;
