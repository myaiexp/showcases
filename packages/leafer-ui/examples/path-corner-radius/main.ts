// Path: cornerRadius smooths path corners
import { Leafer, Path } from 'leafer-ui';
import '@leafer-in/corner'; // the corner plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide cornerRadius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const path = new Path({ ...mid(stage, S), scale: k, path: 'M 5 5 L 95 25 L 80 95 L 15 80 Z', cornerRadius: 10, fill: '#32cd79' });
  leafer.add(path);
  drive(stage, 'cornerRadius', [0, 30, 1], 10, (v) => (path.cornerRadius = v / k), 4);

  return stage.dispose;
};

export default mount;
