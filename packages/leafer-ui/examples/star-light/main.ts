// Star: a four-point sparkle
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide innerRadius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, corners: 4, innerRadius: 0.1, fill: '#32cd79' });
  leafer.add(star);
  drive(stage, 'innerRadius', [0.02, 0.6, 0.01], 0.1, (v) => (star.innerRadius = v), 3);

  return stage.dispose;
};

export default mount;
