// Text: isOverflow tells when text spills
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide height.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.width - 80;
  const text = new Text({ x: 40, y: 20, width: w, height: 70, text: 'Leafer draws text on a canvas, wraps it inside a box and lays it out like HTML text.', fill: '#333', fontSize: stage.preview ? 14 : 20, textOverflow: 'show' });
  const frame = new Rect({ x: 40, y: 20, width: w, height: 70, hittable: false, stroke: '#32cd79', strokeWidth: 2 });
  leafer.add([frame, text]);
  const note = caption(stage, leafer);
  drive(stage, 'height', [20, 140, 1], 70, (v) => {
    text.height = v;
    frame.height = v;
    leafer.nextRender(() => {
      frame.stroke = text.isOverflow ? '#FF4B4B' : '#32cd79';
      note.text = `isOverflow: ${text.isOverflow}`;
    });
  }, 5);

  return stage.dispose;
};

export default mount;
