// Image filter: add and remove the filter array from a fill
import { Leafer, Image } from 'leafer-ui';
import '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, toggle } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { freeFilterContexts } from '../../shared/gpu.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick the box to apply saturation -1 and exposure 0.2.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 160 : 280; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const image = new Image({ ...mid(stage, w, h), width: w, height: h });
  leafer.add(image);
  freeFilterContexts(stage, () => [image]);

  toggle(stage, 'filter', true, (on) => {
    image.fill = on
      ? { type: 'image', url, mode: 'stretch', filter: [{ type: 'saturation', value: -1 }, { type: 'exposure', value: 0.2 }] }
      : { type: 'image', url, mode: 'stretch' };
  }, 1600);

  return stage.dispose;
};

export default mount;
