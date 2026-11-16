// Appearance: image repeat mode rotated, free or in 90 degree steps
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive, toggle } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Try 45 degrees with and without freeTransform." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const w = S * 1.5;
  const h = S * 0.9;
  const rect = new Rect({ x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 6, width: w, height: h, cornerRadius: 8 });
  leafer.add(rect);
  let rotation = 90;
  let freeTransform = true;
  const paint = (): void => {
    rect.fill = { type: 'image', url: photo(), mode: 'repeat', scale: 0.2, rotation, freeTransform };
  };
  drive(stage, 'rotation', [0, 180, 5], 90, (v) => ((rotation = v), paint()), 6);
  toggle(stage, 'freeTransform', true, (v) => ((freeTransform = v), paint()), 3000);

  return stage.dispose;
};

export default mount;
