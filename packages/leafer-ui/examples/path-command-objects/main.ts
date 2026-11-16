// Path: commands as { name, x, y } objects
import { Leafer, Path } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide the control point of the C command.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const path = new Path({ ...mid(stage, S), scale: k, fill: '#32cd79', stroke: '#1d7a48', strokeWidth: 2 / k });
  leafer.add(path);
  drive(stage, 'control y', [-40, 140, 1], 0, (v) => {
    path.path = [
      { name: 'M', x: 0, y: 50 },
      { name: 'C', x1: 30, y1: v, x2: 70, y2: 100 - v, x: 100, y: 50 },
      { name: 'L', x: 100, y: 100 },
      { name: 'Q', x1: 50, y1: 70, x: 0, y: 100 },
      { name: 'Z' },
    ];
  }, 4);

  return stage.dispose;
};

export default mount;
