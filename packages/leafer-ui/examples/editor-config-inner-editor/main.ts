// Editor config: an inner editor's own settings keyed by its tag
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/text-editor';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, textBox, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "The editor config carries one object per inner editor, keyed by the editor's tag (TextEditor here): selectAll false opens the text without selecting it." });
  const app = stage.own(new App({ view: stage.view, editor: { TextEditor: { selectAll: false } } as never }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor());
  watch(stage, () => 'mergeConfig.TextEditor: ' + JSON.stringify(app.editor.mergeConfig['TextEditor' as never]));

  actions(stage, [{ name: 'app.editor.openInnerEditor(text, true)', run: () => app.editor.openInnerEditor(text, true) }], {
    reset: () => (app.editor.closeInnerEditor(), app.editor.cancel()),
    gap: 2200,
  });
  return stage.dispose;
};

export default mount;
