// Appearance: innerShadow with spread
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide spread." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.3, fill: '#32cd79' });
  leafer.add(rect);
  drive(stage, 'spread', [-10, 30, 1], 6, (spread) => {
    rect.innerShadow = { x: 10, y: 5, blur: 20, spread, color: '#FF0000AA' };
  }, 5);

  return stage.dispose;
};

export default mount;
