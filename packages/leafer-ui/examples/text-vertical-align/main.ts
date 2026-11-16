// Text: verticalAlign top, middle, bottom
import { Leafer, Rect, Text } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { pick, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a verticalAlign.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.width - 80, h = stage.height - 70;
  const text = new Text({ x: 40, y: 12, width: w, height: h, text: 'Vertical', fill: '#333', fontSize: stage.preview ? 20 : 30, textAlign: 'center' });
  const frame = new Rect({ x: 40, y: 12, width: w, height: h, hittable: false, stroke: '#32cd79', strokeWidth: 1, dashPattern: [4, 4] });
  leafer.add([frame, text]);
  const note = caption(stage, leafer);
  pick(stage, 'verticalAlign', ['top', 'middle', 'bottom'] as const, (v) => {
    text.verticalAlign = v;
    note.text = `verticalAlign: '${v}'`;
  }, 1300);

  return stage.dispose;
};

export default mount;
