// Editor: openInnerEditor() starts editing a Text from code
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/text-editor'; // the text inner editor
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, textBox } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'openInnerEditor(text, true) selects the Text and enters text editing; click outside to leave it.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor()); // the text editor listens on window until it closes

  actions(stage, [{ name: 'app.editor.openInnerEditor(text, true)', run: () => app.editor.openInnerEditor(text, true) }], {
    reset: () => (app.editor.closeInnerEditor(), app.editor.cancel()),
    gap: 2200,
  });
  return stage.dispose;
};

export default mount;
