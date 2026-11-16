// Editor config: preventEditInner stops the double-click inner editor
import { App, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import '@leafer-in/text-editor';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, spot, textBox, tune, variants, watch } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Double-click the text with the option on and off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { preventEditInner: true } }));
  const { x, y, width, fontSize } = textBox(stage);
  const text = Text.one({ text: 'Action is the proper fruit of knowledge.', editable: true, fill: '#c98a00', fontSize }, x, y, width);
  app.tree.add(text);
  stage.onDispose(() => app.editor.closeInnerEditor());
  watch(stage, () => 'innerEditing: ' + app.editor.innerEditing);
  const ghost = stage.preview ? stage.ghost(app) : null;
  variants(stage, 'preventEditInner', [true, false], (v) => (app.editor.closeInnerEditor(), app.editor.cancel(), tune(app)({ preventEditInner: v })), ghost ? async () => {
    await stage.wait(400);
    await ghost.doubleTap(spot(text).x, spot(text).y);
    await stage.wait(1500);
    await ghost.tap(12, stage.height - 14);
  } : undefined);
  return stage.dispose;
};

export default mount;
