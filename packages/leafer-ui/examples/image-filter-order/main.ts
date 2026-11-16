// Image filter: [exposure, contrast] against [contrast, exposure]
import { Leafer, Text, Image } from 'leafer-ui';
import '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { photo } from '../../shared/images.ts';
import { freeFilterContexts } from '../../shared/gpu.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same two filters and values in two orders.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 110 : 250;
  const h = (w * 3) / 4;
  const gap = stage.preview ? 10 : 20;
  const x0 = (stage.width - (2 * w + gap)) / 2;
  const y = (stage.height - h) / 2;
  const url = photo();
  const exposure = { type: 'exposure', value: 0.8 };
  const contrast = { type: 'contrast', value: 0.8 };
  const a = new Image({ x: x0, y, width: w, height: h, fill: { type: 'image', url, mode: 'stretch', filter: [exposure, contrast] } });
  const b = new Image({ x: x0 + w + gap, y, width: w, height: h, fill: { type: 'image', url, mode: 'stretch', filter: [contrast, exposure] } });
  const k = stage.preview ? 10 : 14;
  leafer.add([
    a,
    b,
    new Text({ x: x0, y: y + h + 8, text: 'exposure, contrast', fontSize: k, fill: '#666' }),
    new Text({ x: x0 + w + gap, y: y + h + 8, text: 'contrast, exposure', fontSize: k, fill: '#666' }),
  ]);
  freeFilterContexts(stage, () => [a, b]);

  return stage.dispose;
};

export default mount;
