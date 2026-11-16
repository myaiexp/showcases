// Text: fontWeight names and numbers
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a weight name.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 20, y: stage.height / 2 - 30, width: stage.width - 40, text: 'Weight', fill: '#333', fontSize: stage.preview ? 44 : 70, textAlign: 'center', fontFamily: 'sans-serif' });
  leafer.add(text);
  const note = caption(stage, leafer);
  const names = ['thin', 'extra-light', 'light', 'normal', 'medium', 'semi-bold', 'bold', 'extra-bold', 'black'] as const;
  pick(stage, 'fontWeight', names, (v) => {
    text.fontWeight = v;
    note.text = `fontWeight: '${v}'`;
  }, 900, 'normal');

  return stage.dispose;
};

export default mount;
