// Text: fontFamily lists and fallbacks
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a font family.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 20, y: stage.height / 2 - 40, width: stage.width - 40, text: 'Hamburgefonstiv 123', fill: '#333', fontSize: 30, textAlign: 'center' });
  leafer.add(text);
  const note = caption(stage, leafer);
  pick(stage, 'fontFamily', ['sans-serif', 'serif', 'monospace', 'cursive', 'Georgia, serif', 'Impact, sans-serif'], (v) => {
    text.fontFamily = v;
    note.text = `fontFamily: ${v}`;
  }, 1400);
  drive(stage, 'fontSize', [14, 60, 1], 30, (v) => (text.fontSize = v), 6);

  return stage.dispose;
};

export default mount;
