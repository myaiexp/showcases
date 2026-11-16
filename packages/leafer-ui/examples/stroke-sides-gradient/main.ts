// Stroke sides: a linear gradient as the stroke paint
import { Leafer, Rect } from 'leafer-ui';
import '@leafer-in/stroke-sides';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The gradient is painted through the stroke shape.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({
    ...mid(stage, S * 1.3, S),
    width: S * 1.3,
    height: S,
    fill: '#fff',
    stroke: { type: 'linear', from: 'left', to: 'right', stops: ['#32cd79', '#ffcd00', '#f06a6a'] },
    strokeWidth: [8, 20, 8, 40],
  });
  leafer.add(rect);

  stage.loop((_dt, t) => {
    rect.strokeWidth = [8, Math.round(20 + 12 * Math.sin(t * 1.3)), 8, Math.round(36 + 14 * Math.cos(t))];
  });

  return stage.dispose;
};

export default mount;
