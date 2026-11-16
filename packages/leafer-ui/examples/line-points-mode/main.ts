// Line: isPointsMode flips with points
import { Leafer, Line } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, toggle, caption } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle points mode.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const k = S / 100;
  const line = new Line({ ...mid(stage, S), width: S, rotation: 20, strokeWidth: 5, stroke: '#32cd79' });
  leafer.add(line);
  const note = caption(stage, leafer);
  toggle(stage, 'points', false, (v) => {
    if (v) line.points = [10, 90, 10, 10, 50, 70, 90, 10, 90, 90].map((n) => n * k);
    else line.set({ points: undefined, width: S, rotation: 20 });
    note.text = `isPointsMode: ${line.isPointsMode}`;
  }, 1700);

  return stage.dispose;
};

export default mount;
