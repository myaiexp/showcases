// Appearance: image repeat mode, scale as a number and as a point
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Scale the tiles, and stretch them in y." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const w = S * 1.5;
  const h = S * 0.9;
  const rect = new Rect({ x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 6, width: w, height: h, cornerRadius: 8 });
  leafer.add(rect);
  const p = { scale: 0.2, y: 1 };
  const paint = (): void => {
    rect.fill = { type: 'image', url: photo(), mode: 'repeat', scale: { x: p.scale, y: p.scale * p.y } };
  };
  drive(stage, 'scale', [0.1, 0.6, 0.01], 0.2, (v) => ((p.scale = v), paint()), 5);
  drive(stage, 'y factor', [0.5, 2, 0.05], 1, (v) => ((p.y = v), paint()), 7);

  return stage.dispose;
};

export default mount;
