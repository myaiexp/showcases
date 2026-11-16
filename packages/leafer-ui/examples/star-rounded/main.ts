// Star: a rounded eight-point star
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide cornerRadius.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, innerRadius: 0.5, corners: 8, cornerRadius: 5, fill: '#32cd79' });
  leafer.add(star);
  drive(stage, 'cornerRadius', [0, 30, 1], 5, (v) => (star.cornerRadius = v), 4);

  return stage.dispose;
};

export default mount;
