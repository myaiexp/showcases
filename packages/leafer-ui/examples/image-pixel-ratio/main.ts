// Image: pixelRatio shrinks an auto-size picture
import { Image, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, drive, caption } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide pixelRatio.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const image = new Image({ url: photo(), pixelRatio: 1, draggable: true, scale: stage.preview ? 0.5 : 1 });
  leafer.add(image);
  const note = caption(stage, leafer);
  drive(stage, 'pixelRatio', [1, 3, 0.25], 1, (v) => {
    image.pixelRatio = v;
    const k = image.scaleX!;
    image.set(mid(stage, (400 / v) * k, (300 / v) * k));
    note.text = `pixelRatio ${v}: ${Math.round(400 / v)} x ${Math.round(300 / v)}`;
  }, 6);

  return stage.dispose;
};

export default mount;
