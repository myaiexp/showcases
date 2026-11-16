// Appearance: angular gradient rotation
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide rotation (degrees)." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ ...mid(stage, S), width: S, height: S, cornerRadius: S * 0.12 });
  leafer.add(rect);
  drive(stage, 'rotation', [0, 360, 1], 0, (deg) => {
    rect.fill = { type: 'angular', rotation: deg, stops: ['#FF4B4B', '#FEB027', '#79CB4D', '#FF4B4B'] };
  }, 6);

  return stage.dispose;
};

export default mount;
