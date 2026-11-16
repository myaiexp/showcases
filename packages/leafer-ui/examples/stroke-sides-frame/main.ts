// Stroke sides: a Frame as a quote card with a thick left stroke
import { Leafer, Text, Frame } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The Frame clips its Text; the left stroke is 8 px wide.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const k = stage.preview ? 0.7 : 1;
  const w = 250 * k;
  const h = 110 * k;
  const frame = new Frame({
    x: (stage.width - w) / 2,
    y: (stage.height - h) / 2,
    width: w,
    height: h,
    stroke: '#32cd79',
    strokeWidth: [1, 1, 1, 8],
  });
  frame.add(new Text({ x: 20 * k, y: 18 * k, width: w - 40 * k, text: 'Independent side strokes keep a card tidy.', fontSize: 18 * k, lineHeight: 24 * k, fill: '#333' }));
  leafer.add(frame);

  drive(stage, 'left', [0, 24, 1], 8, (v) => (frame.strokeWidth = [1, 1, 1, v]), 5);

  return stage.dispose;
};

export default mount;
