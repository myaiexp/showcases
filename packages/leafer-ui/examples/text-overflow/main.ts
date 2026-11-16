// Text: textOverflow hide, show and an ellipsis
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a textOverflow.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.width - 80, h = stage.preview ? 56 : 90;
  const text = new Text({ x: 40, y: 24, width: w, height: h, text: 'Leafer draws text on a canvas, wraps it inside a box and lays it out like HTML text.', fill: '#333', fontSize: stage.preview ? 14 : 22 });
  const frame = new Rect({ x: 40, y: 24, width: w, height: h, stroke: '#32cd79', strokeWidth: 1, dashPattern: [4, 4], hittable: false });
  leafer.add([frame, text]);
  const note = caption(stage, leafer);
  pick(stage, 'textOverflow', ['hide', 'show', '...', ' (more)'], (v) => {
    text.textOverflow = v;
    note.text = `textOverflow: '${v}'`;
  }, 1700);

  return stage.dispose;
};

export default mount;
