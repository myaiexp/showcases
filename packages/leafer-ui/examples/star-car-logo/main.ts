// Star: corners 3 and a small innerRadius
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide innerRadius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, corners: 3, innerRadius: 0.15, fill: '#32cd79' });
  leafer.add(star);
  drive(stage, 'innerRadius', [0.05, 0.9, 0.01], 0.15, (v) => (star.innerRadius = v), 5);

  return stage.dispose;
};

export default mount;
