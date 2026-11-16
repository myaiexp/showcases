// ImageBox: read ready and image
import { Leafer, ImageEvent } from 'leafer-ui';
import { ImageBox } from '@leafer-in/box';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The values are read from the box.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '');

  const w = stage.preview ? 150 : 260;
  const box = new ImageBox({ ...mid(stage, w, (w * 3) / 4), width: w, height: (w * 3) / 4, url: photo() });
  leafer.add(box);
  say(`ready ${Boolean(box.ready)}  (before LOADED)`);
  box.once(ImageEvent.LOADED, () => say(`ready ${Boolean(box.ready)}  image ${box.image.width} x ${box.image.height}`));

  return stage.dispose;
};

export default mount;
