// Image filter: a Rect with a filtered image fill
import { Leafer, Rect, Image } from 'leafer-ui';
import '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { freeFilterContexts } from '../../shared/gpu.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a look: each is a different filter array on the same fill.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 150 : 280;
  const h = stage.preview ? 150 : 250;
  const url = photo();
  const rect = new Rect({ ...mid(stage, w, h), width: w, height: h, cornerRadius: 30, stroke: '#32cd79', strokeWidth: 6 });
  leafer.add(rect);
  freeFilterContexts(stage, () => [rect]);

  const looks = {
    faded: [{ type: 'saturation', value: -0.7 }, { type: 'exposure', value: 0.2 }],
    warm: [{ type: 'temperature', value: 0.9 }, { type: 'contrast', value: 0.2 }],
    cool: [{ type: 'temperature', value: -0.9 }, { type: 'tint', value: -0.3 }],
    dramatic: [{ type: 'contrast', value: 0.6 }, { type: 'shadows', value: -0.6 }],
  };
  type Look = keyof typeof looks;
  const show = (look: Look): void => {
    rect.fill = { type: 'image', url, mode: 'fit', filter: looks[look] };
  };
  const names = Object.keys(looks) as Look[];
  if (stage.bar) {
    select(stage.bar, 'look', names, show);
    show('faded');
  } else {
    let i = 0;
    show(names[0]!);
    stage.every(1500, () => show(names[(i = (i + 1) % names.length)]!));
  }

  return stage.dispose;
};

export default mount;
