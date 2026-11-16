// InnerEditorEvent: OPEN and CLOSE around an inner editor
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { InnerEditorEvent } from '@leafer-in/editor';
import '@leafer-in/text-editor';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { geo, spot, textBox } from '../../shared/editor-kit.ts';
import { logLines } from '../../shared/interaction-demo.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Double-click the text, then click outside." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: {} }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor());
  const log = logLines(stage, 5, true);
  for (const type of [InnerEditorEvent.BEFORE_OPEN, InnerEditorEvent.OPEN, InnerEditorEvent.BEFORE_CLOSE, InnerEditorEvent.CLOSE]) {
    app.editor.on(type, (e: InnerEditorEvent) => log(e.type.replace('innerEditor.', '') + ' ' + e.editTarget.tag + ' / ' + e.innerEditor.tag));
  }
  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      app.editor.cancel();
      await stage.wait(600);
      await ghost.tap(spot(text).x, spot(text).y);
      await stage.wait(700);
      await ghost.doubleTap(spot(text).x, spot(text).y);
      await stage.wait(1300);
      await ghost.tap(12, stage.height - 14);
      await stage.wait(1200);
    });
  }
  return stage.dispose;
};

export default mount;
