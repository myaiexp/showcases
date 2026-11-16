// UI: flip mirrors an element
import { Image, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press flip x and flip y.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 0.7;
  const image = new Image({ url: photo(), width: S * 1.33, height: S, x: stage.width / 2 - S * 0.66, y: stage.height / 2 - S / 2 - 8 });
  leafer.add(image);
  const note = caption(stage, leafer);
  const flip = (axis: 'x' | 'y'): void => {
    image.flip(axis);
    note.text = `flip('${axis}'): scaleX ${image.scaleX}, scaleY ${image.scaleY}`;
  };
  if (stage.bar) {
    button(stage.bar, 'flip x', () => flip('x'));
    button(stage.bar, 'flip y', () => flip('y'));
  } else {
    let i = 0;
    stage.every(1100, () => flip(i++ % 2 ? 'y' : 'x'));
  }

  return stage.dispose;
};

export default mount;
