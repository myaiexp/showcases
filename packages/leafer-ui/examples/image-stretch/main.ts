// Appearance: image stretch mode in a box that changes shape
import { Leafer, Rect } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, drive } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Change the width of the box." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const rect = new Rect({ y: (stage.height - S) / 2 - 6, height: S, fill: { type: 'image', url: photo(), mode: 'stretch' } });
  leafer.add(rect);
  drive(stage, 'width', [S * 0.3, S * 2, 2], S * 0.8, (v) => rect.set({ width: v, x: (stage.width - v) / 2 }), 5);

  return stage.dispose;
};

export default mount;
