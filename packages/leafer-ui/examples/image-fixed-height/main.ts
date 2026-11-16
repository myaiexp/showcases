// Image: a fixed height keeps the aspect ratio
import { Image, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, drive, caption } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide height: width follows.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const image = new Image({ url: photo(), height: 50, draggable: true });
  leafer.add(image);
  const note = caption(stage, leafer);
  drive(stage, 'height', [30, 300, 2], 50, (v) => {
    image.height = v;
    image.set(mid(stage, v * (4 / 3), v));
    note.text = `height ${v}, width ${Math.round(v * (4 / 3))}`;
  }, 5);

  return stage.dispose;
};

export default mount;
