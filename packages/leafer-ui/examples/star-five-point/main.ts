// Star: the default five-point star
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide startAngle.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, corners: 5, fill: '#32cd79' });
  leafer.add(star);
  drive(stage, 'startAngle', [-180, 180, 1], 0, (v) => (star.startAngle = v), 6);

  return stage.dispose;
};

export default mount;
