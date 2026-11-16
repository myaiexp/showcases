// Appearance: fading an image fill with the paint opacity
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';
import { stripes } from '../../shared/appearance.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Slide the paint opacity." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  stripes(leafer, stage);
  const S = size(stage);
  const w = S * 1.5;
  const h = S * 0.9;
  const rect = new Rect({ x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 6, width: w, height: h, cornerRadius: 8 });
  leafer.add(rect);
  drive(stage, 'opacity', [0, 1, 0.05], 0.6, (v) => (rect.fill = { type: 'image', url: photo(), opacity: v }), 5);

  return stage.dispose;
};

export default mount;
