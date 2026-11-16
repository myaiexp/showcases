// Image: lazy loading and the ready flag
import { Image, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the picture into view (or press slide in) and watch ready.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const note = caption(stage, leafer);
  const image = new Image({ url: photo(), lazy: true, draggable: true, scale: stage.preview ? 0.35 : 0.6 });
  const w = 400 * image.scaleX!;
  image.x = stage.width + 30;
  image.y = (stage.height - 300 * image.scaleY!) / 2 - 10;
  leafer.add(image);
  stage.loop(() => (note.text = `x ${Math.round(image.x!)}, ready: ${image.ready}`));
  const slideIn = (): void => {
    image.x = stage.width + 30;
    const from = image.x!;
    const to = (stage.width - w) / 2;
    let t = 0;
    const id = window.setInterval(() => {
      t += 0.04;
      image.x = from + (to - from) * Math.min(1, t);
      if (t >= 1) window.clearInterval(id);
    }, 16);
    stage.onDispose(() => window.clearInterval(id));
  };
  if (stage.bar) button(stage.bar, 'slide in', slideIn);
  else stage.every(4000, slideIn);

  return stage.dispose;
};

export default mount;
