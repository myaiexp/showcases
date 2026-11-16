// Image filter: the same url, a warm and a cool copy
import { Leafer, Image } from 'leafer-ui';
import '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { photo } from '../../shared/images.ts';
import { freeFilterContexts } from '../../shared/gpu.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both fills use one url.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 110 : 250;
  const h = (w * 3) / 4;
  const gap = stage.preview ? 10 : 20;
  const x0 = (stage.width - (2 * w + gap)) / 2;
  const y = (stage.height - h) / 2;
  const url = photo();
  const warm = new Image({ x: x0, y, width: w, height: h, fill: { type: 'image', url, mode: 'stretch', filter: [{ type: 'temperature', value: 1 }] } });
  const cool = new Image({ x: x0 + w + gap, y, width: w, height: h, fill: { type: 'image', url, mode: 'stretch', filter: [{ type: 'temperature', value: -1 }] } });
  leafer.add([warm, cool]);
  freeFilterContexts(stage, () => [warm, cool]);

  stage.loop((_dt, t) => {
    warm.rotation = Math.sin(t * 1.4) * 4; // the filtered canvas is made once; moving the element redraws it
    cool.rotation = -Math.sin(t * 1.4) * 4;
  });

  return stage.dispose;
};

export default mount;
