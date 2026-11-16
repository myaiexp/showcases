// Rect: one cornerRadius number for all corners
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide cornerRadius: past half the short side the corners become a semicircle.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S, S * 0.7), width: S, height: S * 0.7, fill: '#32cd79', cornerRadius: 20 });
  leafer.add(rect);
  drive(stage, 'cornerRadius', [0, 80, 1], 20, (v) => (rect.cornerRadius = v), 4);

  return stage.dispose;
};

export default mount;
