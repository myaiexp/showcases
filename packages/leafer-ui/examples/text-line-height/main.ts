// Text: lineHeight as a percentage
import { Leafer, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide lineHeight (percent).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const text = new Text({ x: 20, y: 16, width: stage.width - 40, text: 'Leafer draws text on a canvas, wraps it inside a box and lays it out like HTML text.', fill: '#333', fontSize: stage.preview ? 14 : 22 });
  leafer.add(text);
  const note = caption(stage, leafer);
  drive(stage, 'lineHeight', [0.8, 2.5, 0.05], 1.5, (v) => {
    text.lineHeight = { type: 'percent', value: v };
    note.text = `lineHeight: ${Math.round(v * 100)}%`;
  }, 5);

  return stage.dispose;
};

export default mount;
