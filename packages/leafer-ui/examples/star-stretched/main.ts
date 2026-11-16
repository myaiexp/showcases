// Star: width and height stretch the star
import { Leafer, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width and height.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const star = new Star({ ...mid(stage, S), width: S, height: S, corners: 5, fill: '#32cd79', draggable: true });
  leafer.add(star);
  drive(stage, 'width', [60, 380, 2], S, (v) => (star.width = v), 5);
  drive(stage, 'height', [60, 300, 2], S, (v) => (star.height = v), 7);

  return stage.dispose;
};

export default mount;
