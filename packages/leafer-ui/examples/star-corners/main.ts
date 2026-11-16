// Star: the number of corners
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide corners.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, corners: 3, fill: '#32cd79' });
  leafer.add(star);
  drive(stage, 'corners', [3, 16, 1], 3, (v) => (star.corners = v), 8);

  return stage.dispose;
};

export default mount;
