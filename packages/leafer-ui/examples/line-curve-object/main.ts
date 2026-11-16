// Line: curve object with type Q
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the value of the Q curve.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const line = new Line({ ...mid(stage, S), points: [10, 90, 10, 10, 50, 70, 90, 10, 90, 90].map((v) => v * k), curve: { type: 'Q', value: 0.3 }, strokeWidth: 5, stroke: '#32cd79' });
  leafer.add(line);
  drive(stage, 'value', [0, 1, 0.02], 0.3, (v) => (line.curve = { type: 'Q', value: v }), 5);

  return stage.dispose;
};

export default mount;
