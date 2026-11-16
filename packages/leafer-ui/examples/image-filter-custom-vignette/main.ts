// Image filter: a custom shader that reads uv
import { Leafer, Image } from 'leafer-ui';
import { registerImageFilter } from '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { driveSlow, freeFilterContexts } from '../../shared/gpu.ts';

registerImageFilter('vignette', `
vec3 vignette( vec3 c, float v, vec2 uv, vec2 resolution ){
    float d = distance(uv, vec2(0.5)); // 0 at the centre, about 0.7 in the corners
    return c * (1.0 - v * d * 1.6);
}`);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The value sets how dark the corners become.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 160 : 280; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const image = new Image({ ...mid(stage, w, h), width: w, height: h });
  leafer.add(image);
  freeFilterContexts(stage, () => [image]);

  driveSlow(stage, 'vignette', [0, 1, 0.05], 0.8, (value) => {
    image.fill = { type: 'image', url, mode: 'stretch', filter: [{ type: 'vignette', value }] };
  }, 5);

  return stage.dispose;
};

export default mount;
