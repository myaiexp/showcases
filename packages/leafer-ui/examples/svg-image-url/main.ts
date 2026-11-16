// Image: an SVG file as the url
import { Image, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, drive } from '../../shared/shapes.ts';
import { cursorSvg } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width: the arrow stays crisp at any size.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const image = new Image({ url: cursorSvg(), width: 24, draggable: true });
  leafer.add(image);
  drive(stage, 'width', [12, 360, 2], 24, (v) => {
    image.set({ width: v, height: v, ...mid(stage, v) });
  }, 6);

  return stage.dispose;
};

export default mount;
