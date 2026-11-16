// Text: textWrap normal, none and break
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { drive, pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a textWrap and change the width.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.width - 80;
  const text = new Text({ x: 40, y: 24, width: w, text: 'Supercalifragilistic words wrap at spaces.', fill: '#333', fontSize: stage.preview ? 16 : 24 });
  const frame = new Rect({ x: 40, y: 24, width: w, height: stage.height - 80, stroke: '#32cd79', strokeWidth: 1, dashPattern: [4, 4], hittable: false });
  leafer.add([frame, text]);
  const note = caption(stage, leafer);
  pick(stage, 'textWrap', ['normal', 'none', 'break'] as const, (v) => {
    text.textWrap = v;
    note.text = `textWrap: '${v}'`;
  }, 1700);
  drive(stage, 'width', [60, w, 2], w, (v) => ((text.width = v), (frame.width = v)), 6);

  return stage.dispose;
};

export default mount;
