// Appearance: image repeat true, x, y or a tile count
import { Leafer, Rect } from 'leafer-ui';
import { arrows } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, pick } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Pick a repeat form." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage);
  const w = S * 1.5;
  const h = S * 0.9;
  const rect = new Rect({ x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 6, width: w, height: h, cornerRadius: 8 });
  leafer.add(rect);
  const forms = { true: true, x: 'x', y: 'y', '{ x: 3, y: 2 }': { x: 3, y: 2 } } as const;
  pick(stage, 'repeat', Object.keys(forms) as (keyof typeof forms)[], (k) => {
    rect.fill = { type: 'image', url: arrows(), mode: 'repeat', size: 50, repeat: forms[k] };
  }, 1600);

  return stage.dispose;
};

export default mount;
