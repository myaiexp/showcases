// Image filter: the 'temperature' filter on an image paint, driven by a value
import { Leafer, Image } from 'leafer-ui';
import '@leafer-in/image-filter'; // the GPU image filter plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';
import { driveSlow, freeFilterContexts } from '../../shared/gpu.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move the slider; 0 means no effect, the range is -1 to 1.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 160 : 280; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const image = new Image({ ...mid(stage, w, h), width: w, height: h });
  leafer.add(image);
  freeFilterContexts(stage, () => [image]);

  driveSlow(stage, 'temperature', [-1, 1, 0.05], 0, (value) => {
    image.fill = {
      type: 'image',
      url,
      mode: 'stretch',
      filter: [{ type: 'temperature', value }], // shifts red against blue
    };
  }, 5);

  return stage.dispose;
};

export default mount;
