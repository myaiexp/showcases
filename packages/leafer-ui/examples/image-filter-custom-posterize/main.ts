// Image filter: a custom posterize filter
import { Leafer, Image } from 'leafer-ui';
import { registerImageFilter } from '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { driveSlow, freeFilterContexts } from '../../shared/gpu.ts';

registerImageFilter('posterize', `
vec3 posterize( vec3 c, float v, vec2 uv, vec2 resolution ){
    return floor(c * v + 0.5) / v; // v colour steps per channel
}`);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fewer levels, flatter colours.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 160 : 280; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const image = new Image({ ...mid(stage, w, h), width: w, height: h });
  leafer.add(image);
  freeFilterContexts(stage, () => [image]);

  driveSlow(stage, 'levels', [2, 12, 1], 4, (value) => {
    image.fill = { type: 'image', url, mode: 'stretch', filter: [{ type: 'posterize', value }] };
  }, 6);

  return stage.dispose;
};

export default mount;
