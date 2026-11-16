// Path: draw with path.pen
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the hole radius; every change redraws through path.pen.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const path = new Path({ ...mid(stage, S), scale: S / 100, fill: '#32cd79' });
  leafer.add(path);
  path.windingRule = 'evenodd';
  // The pen is shared: use it right after the element, in one chain.
  const draw = (r: number): void => {
    path.path = []; // start from empty path data
    path.pen.roundRect(0, 0, 100, 100, 30).drawArc(50, 50, r);
  };
  drive(stage, 'radius', [5, 45, 1], 25, draw, 4);

  return stage.dispose;
};

export default mount;
