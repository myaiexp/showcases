// Image filter: tint changed on every frame
import { Leafer, Image } from 'leafer-ui';
import '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { freeFilterContexts } from '../../shared/gpu.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A new tint value 2.5 times a second, in steps of 0.1.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 160 : 280; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const image = new Image({ ...mid(stage, w, h), width: w, height: h });
  leafer.add(image);
  freeFilterContexts(stage, () => [image]);

  // Every change compiles a shader and uploads a texture that image-filter keeps until the context is lost:
  // change the value a few times a second, in coarse steps, not every frame.
  const t0 = performance.now();
  stage.every(400, () => {
    const value = Math.round(Math.sin(((performance.now() - t0) / 1000) * 1.2) * 10) / 10;
    image.fill = { type: 'image', url, mode: 'stretch', filter: [{ type: 'tint', value }] };
  });

  return stage.dispose;
};

export default mount;
