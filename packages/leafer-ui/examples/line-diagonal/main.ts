// Line: a diagonal dashed line
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide rotation (-180 to 180) and the dash length.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const line = new Line({ x: stage.width / 2 - S / 2, y: stage.height / 2, width: S, rotation: 45, strokeWidth: 5, stroke: '#32cd79', dashPattern: [10, 10] });
  leafer.add(line);
  drive(stage, 'rotation', [-180, 180, 1], 45, (v) => (line.rotation = v), 8);
  if (stage.bar) slider(stage.bar, 'dash', 1, 40, 1, 10, (v) => (line.dashPattern = [v, v]));

  return stage.dispose;
};

export default mount;
