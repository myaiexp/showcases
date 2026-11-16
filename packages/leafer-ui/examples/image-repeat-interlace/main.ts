// Appearance: image repeat interlace in pixels, percent and on the y axis
import { Leafer, Rect } from 'leafer-ui';
import { arrows } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick an interlace form." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const w = S * 1.5;
  const h = S * 0.9;
  const rect = new Rect({ x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 6, width: w, height: h, cornerRadius: 8 });
  leafer.add(rect);
  const forms = {
    none: undefined,
    '20 (px on x)': 20,
    '{ type: "percent", value: 0.5 }': { type: 'percent' as const, value: 0.5 },
    'y, offset 50%': { type: 'y' as const, offset: { type: 'percent' as const, value: 0.5 } },
  };
  pick(stage, 'interlace', Object.keys(forms) as (keyof typeof forms)[], (k) => {
    rect.fill = { type: 'image', url: arrows(), mode: 'repeat', size: 44, interlace: forms[k] };
  }, 1700);

  return stage.dispose;
};

export default mount;
