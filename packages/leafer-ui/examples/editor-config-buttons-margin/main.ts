// Editor config: buttonsMargin spaces the button group
import { App, Box, Text } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { drive } from '../../shared/shapes.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { geo, solo, tune } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide buttonsMargin." });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { buttonsMargin: 12 } }));
  const rect = solo(stage, g, { fill: '#FEB027' });
  app.tree.add(rect);
  app.editor.buttons.add(Box.one({ around: 'center', fill: '#32cd79', cornerRadius: 20, children: [{ tag: 'Text', fill: 'white', text: 'Button', padding: stage.preview ? [4, 8] : [7, 10], fontSize: stage.preview ? 12 : 16 }] }));
  app.editor.select(rect);
  drive(stage, 'buttonsMargin', [0, 40, 1], 12, (v) => tune(app)({ buttonsMargin: v }), 4);
  return stage.dispose;
};

export default mount;
