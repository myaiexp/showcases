// Image: an SVG string through Platform.toURL
import { Image, Leafer, Platform } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, drive } from '../../shared/shapes.ts';
import { LEAF_SVG } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide width.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const image = new Image({ url: Platform.toURL(LEAF_SVG, 'svg'), width: 60, height: 60, draggable: true });
  leafer.add(image);
  drive(stage, 'width', [16, 380, 2], 60, (v) => image.set({ width: v, height: v, ...mid(stage, v) }), 6);

  return stage.dispose;
};

export default mount;
