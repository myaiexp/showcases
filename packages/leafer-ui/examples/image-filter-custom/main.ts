// Image filter: register a custom filter written in GLSL
import { Leafer, Image } from 'leafer-ui';
import { registerImageFilter } from '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { driveSlow, freeFilterContexts } from '../../shared/gpu.ts';

/* c: input colour (rgb 0 to 1), v: the filter's value, uv: pixel texture coordinate (0 to 1),
   resolution: the filter canvas size in pixels */
registerImageFilter('customFilter', `
vec3 customFilter( vec3 c, float v, vec2 uv, vec2 resolution ){
    return c*vec3(1.0+0.3*v);
}`);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The value scales the brightness through the custom shader.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 160 : 280; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const image = new Image({ ...mid(stage, w, h), width: w, height: h });
  leafer.add(image);
  freeFilterContexts(stage, () => [image]);

  driveSlow(stage, 'customFilter', [0, 3, 0.1], 1, (value) => {
    image.fill = { type: 'image', url, mode: 'stretch', filter: [{ type: 'customFilter', value }] }; // names are letters only
  }, 5);

  return stage.dispose;
};

export default mount;
