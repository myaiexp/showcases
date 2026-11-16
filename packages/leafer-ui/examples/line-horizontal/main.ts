// Line: a horizontal line from width
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width; drag the line to move it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const line = new Line({ ...mid(stage, S, 0), width: S, strokeWidth: 5, stroke: '#32cd79', draggable: true });
  leafer.add(line);
  drive(stage, 'width', [20, 380, 2], S, (v) => (line.width = v), 4);

  return stage.dispose;
};

export default mount;
