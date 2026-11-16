// Editor config: buttonsFixed keeps the buttons upright
import { App, Box, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, keep, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Rotate the rect: the button stays below it with buttonsFixed on, and turns with it when off." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { buttonsFixed: true } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.select(rect);
  const restore = keep(rect, app);
  const ghost = stage.preview ? stage.ghost(app) : null;

  app.editor.buttons.add(Box.one({ around: 'center', fill: '#32cd79', cornerRadius: 20, children: [{ tag: 'Text', fill: 'white', text: 'Button', padding: stage.preview ? [4, 8] : [7, 10], fontSize: stage.preview ? 12 : 16 }] }));
  variants(stage, 'buttonsFixed', [true, false], (v) => (restore(), tune(app)({ buttonsFixed: v })), stage.preview ? async () => {
    await stage.wait(600);
    app.editor.rotateOf('center', 90);
    await stage.wait(1500);
  } : undefined);
  return stage.dispose;
};

export default mount;
