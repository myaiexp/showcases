// Path: windingRule cuts a hole
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle evenodd.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const frame = new Path({ ...mid(stage, S), scale: k, path: 'X 0 0 100 100 30 P 50 50 25', windingRule: 'evenodd', fill: '#FF4B4B' });
  const dot = new Path({ ...mid(stage, S), scale: k, path: 'P 50 50 20', fill: '#FEB027' });
  leafer.add([frame, dot]);
  toggle(stage, 'evenodd', true, (v) => (frame.windingRule = v ? 'evenodd' : 'nonzero'), 1500);

  return stage.dispose;
};

export default mount;
