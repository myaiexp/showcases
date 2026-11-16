// Line: vertical line with rotation 90
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide rotation between 0 and 90.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const line = new Line({ x: stage.width / 2, y: stage.height / 2 - S / 2, width: S, rotation: 90, strokeWidth: 5, stroke: '#32cd79' });
  leafer.add(line);
  drive(stage, 'rotation', [0, 90, 1], 90, (v) => (line.rotation = v), 4);

  return stage.dispose;
};

export default mount;
