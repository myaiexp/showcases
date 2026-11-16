// Appearance: shadow spread
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide spread below and above zero." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.2, fill: '#32cd79' });
  leafer.add(rect);
  drive(stage, 'spread', [-20, 30, 1], 10, (spread) => {
    rect.shadow = { x: 0, y: 6, blur: 14, spread, color: '#00000066' };
  }, 5);

  return stage.dispose;
};

export default mount;
