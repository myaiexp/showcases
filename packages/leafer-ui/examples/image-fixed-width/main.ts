// Image: a fixed width keeps the aspect ratio
import { Image, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, drive, caption } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width: height follows.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const image = new Image({ url: photo(), width: 50, draggable: true });
  leafer.add(image);
  const note = caption(stage, leafer);
  drive(stage, 'width', [30, 400, 2], 50, (v) => {
    image.width = v;
    image.set(mid(stage, v, v * 0.75));
    note.text = `width ${v}, height ${Math.round(v * 0.75)}`;
  }, 5);

  return stage.dispose;
};

export default mount;
