// Editor: getInnerEditor() returns the singleton inner editor to configure
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/text-editor';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, textBox, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The text editor selects all text on opening; set its config.selectAll to false and the caret lands at the end instead.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor());
  const textEditor = (): { config: { selectAll: boolean } } => app.editor.getInnerEditor('TextEditor') as never;
  watch(stage, () => 'TextEditor config.selectAll: ' + textEditor().config.selectAll);

  const reset = (): void => {
    app.editor.closeInnerEditor();
    app.editor.cancel();
    textEditor().config.selectAll = true;
  };
  actions(
    stage,
    [
      { name: "getInnerEditor('TextEditor').config.selectAll = false", run: () => void (textEditor().config.selectAll = false) },
      { name: 'app.editor.openInnerEditor(text, true)', run: () => app.editor.openInnerEditor(text, true) },
    ],
    { reset, gap: 1700 },
  );
  return stage.dispose;
};

export default mount;
