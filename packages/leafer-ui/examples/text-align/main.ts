// Text: textAlign including justify and both
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a textAlign.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.width - 60;
  const text = new Text({ x: 30, y: 16, width: w, text: 'Aligned text wraps inside a fixed width box so every line can show how it is placed.', fill: '#333', fontSize: stage.preview ? 13 : 20 });
  const frame = new Rect({ x: 30, y: 16, width: w, height: text.height, hittable: false, stroke: '#32cd79', strokeWidth: 1, dashPattern: [4, 4] });
  leafer.add([frame, text]);
  const note = caption(stage, leafer);
  pick(stage, 'textAlign', ['left', 'center', 'right', 'justify', 'justify-letter', 'both', 'both-letter'] as const, (v) => {
    text.textAlign = v;
    note.text = `textAlign: '${v}'`;
  }, 1400);

  return stage.dispose;
};

export default mount;
