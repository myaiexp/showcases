// Editor config: buttonsDirection places the button group
import { App, Box, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, solo, tune, variants } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Choose a side for the button group." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { buttonsDirection: 'bottom' } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.buttons.add(Box.one({ around: 'center', fill: '#32cd79', cornerRadius: 20, children: [{ tag: 'Text', fill: 'white', text: 'Button', padding: stage.preview ? [4, 8] : [7, 10], fontSize: stage.preview ? 12 : 16 }] }));
  app.editor.select(rect);
  variants(stage, 'buttonsDirection', ['bottom', 'top', 'right', 'left'], (v) => tune(app)({ buttonsDirection: v }));
  return stage.dispose;
};

export default mount;
