// Image filter: a custom shader that reads resolution
import { Leafer, Image } from 'leafer-ui';
import { registerImageFilter } from '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { driveSlow, freeFilterContexts } from '../../shared/gpu.ts';

registerImageFilter('scanlines', `
vec3 scanlines( vec3 c, float v, vec2 uv, vec2 resolution ){
    float row = floor(uv.y * resolution.y);
    float dark = mod(row, 4.0) < 2.0 ? 1.0 : 1.0 - v; // two rows light, two rows dark
    return c * dark;
}`);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The value is how dark the dark rows are.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 160 : 280; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const image = new Image({ ...mid(stage, w, h), width: w, height: h });
  leafer.add(image);
  freeFilterContexts(stage, () => [image]);

  driveSlow(stage, 'scanlines', [0.1, 1, 0.05], 0.5, (value) => {
    image.fill = { type: 'image', url, mode: 'stretch', filter: [{ type: 'scanlines', value }] };
  }, 5);

  return stage.dispose;
};

export default mount;
