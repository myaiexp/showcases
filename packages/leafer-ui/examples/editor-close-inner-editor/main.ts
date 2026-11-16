// Editor: closeInnerEditor() leaves text editing from code
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/text-editor';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, textBox, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The text starts in edit mode; closeInnerEditor() leaves it and returns to the normal edit box.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor());
  watch(stage, () => 'innerEditing: ' + app.editor.innerEditing);

  const reset = (): void => {
    app.editor.closeInnerEditor();
    app.editor.openInnerEditor(text, true);
  };
  reset();
  actions(stage, [{ name: 'app.editor.closeInnerEditor()', run: () => app.editor.closeInnerEditor() }], { reset, gap: 2000 });
  return stage.dispose;
};

export default mount;
