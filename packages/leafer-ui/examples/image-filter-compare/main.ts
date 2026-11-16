// Image filter: the same url with and without filter
import { Leafer, Text, Image } from 'leafer-ui';
import '@leafer-in/image-filter';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { photo } from '../../shared/images.ts';
import { freeFilterContexts } from '../../shared/gpu.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: saturation -1 and contrast 0.4. Right: the original.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = stage.preview ? 110 : 250;
  const h = (w * 3) / 4;
  const gap = stage.preview ? 10 : 20;
  const x0 = (stage.width - (2 * w + gap)) / 2;
  const y = (stage.height - h) / 2;
  const url = photo();
  const filtered = new Image({ x: x0, y, width: w, height: h, fill: { type: 'image', url, mode: 'stretch', filter: [{ type: 'saturation', value: -1 }, { type: 'contrast', value: 0.4 }] } });
  const plain = new Image({ x: x0 + w + gap, y, width: w, height: h, fill: { type: 'image', url, mode: 'stretch' } });
  const k = stage.preview ? 11 : 14;
  leafer.add([
    filtered,
    plain,
    new Text({ x: x0, y: y + h + 8, text: 'with filter', fontSize: k, fill: '#666' }),
    new Text({ x: x0 + w + gap, y: y + h + 8, text: 'original', fontSize: k, fill: '#666' }),
  ]);
  freeFilterContexts(stage, () => [filtered]);

  return stage.dispose;
};

export default mount;
