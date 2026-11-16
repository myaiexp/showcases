// Image filter: the docs' seven filters on one editable image
import { App, Image } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport'; // optional: wheel zoom and pan
import '@leafer-in/image-filter'; // the GPU image filter plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { photo } from '../../shared/images.ts';
import { freeFilterContexts } from '../../shared/gpu.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The picture on the right has no filter, for comparison. Select and resize the left one.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const w = stage.preview ? 110 : 250; // the stand-in photo is 400 x 300
  const h = (w * 3) / 4;
  const url = photo();
  const gap = stage.preview ? 10 : 20;
  const x0 = (stage.width - (2 * w + gap)) / 2;
  const y = (stage.height - h) / 2;
  const image = new Image({
    x: x0,
    y,
    width: w,
    height: h,
    fill: {
      type: 'image',
      url,
      filter: [
        { type: 'exposure', value: 0.3 }, // -1 to 1, 0 means no effect
        { type: 'contrast', value: -0.5 },
        { type: 'saturation', value: -1 },
        { type: 'temperature', value: 1 },
        { type: 'tint', value: 0.5 },
        { type: 'highlights', value: 0.2 },
        { type: 'shadows', value: 0.5 },
      ],
      mode: 'stretch',
    },
    editable: true,
  });
  const plain = new Image({ x: x0 + w + gap, y, width: w, height: h, fill: { type: 'image', url, mode: 'stretch' }, editable: true });
  app.tree.add([image, plain]);
  freeFilterContexts(stage, () => [image]);

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      image.set({ x: x0, y, width: w, height: h });
      await stage.wait(1000);
      await ghost.tap(x0 + w / 2, y + h / 2);
      await stage.wait(500);
      await ghost.drag({ x: x0 + w, y: y + h }, { x: x0 + w - 24, y: y + h - 18 }, 700);
      await stage.wait(900);
      await ghost.tap(130, 10);
      await stage.wait(600);
    });
  }

  return stage.dispose;
};

export default mount;
