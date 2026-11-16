// Appearance: image repeat gap as a number, a point, auto or fit
import { Leafer, Rect } from 'leafer-ui';
import { arrows } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a gap form." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const w = S * 1.5;
  const h = S * 0.9;
  const rect = new Rect({ x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 6, width: w, height: h, cornerRadius: 8 });
  leafer.add(rect);
  const gaps = { '0': 0, '12': 12, '{ x: 24, y: 0 }': { x: 24, y: 0 }, auto: 'auto', fit: 'fit' } as const;
  pick(stage, 'gap', Object.keys(gaps) as (keyof typeof gaps)[], (k) => {
    rect.fill = { type: 'image', url: arrows(), mode: 'repeat', size: 44, gap: gaps[k] };
  }, 1600);

  return stage.dispose;
};

export default mount;
