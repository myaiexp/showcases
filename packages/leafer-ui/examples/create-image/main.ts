// Basics: an Image shown at its natural size
import { Leafer, Image } from 'leafer-ui';
import { photo } from '../../shared/images.ts';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { dragToAndFro } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the picture.' });
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
    }),
  );
  const image = new Image({
    url: photo(), // the docs load /image/leafer.jpg; here it is painted in code
    draggable: true,
    scale: stage.preview ? 0.5 : 1,
  });
  leafer.add(image);

  if (stage.preview) dragToAndFro(stage, leafer, { x: 60, y: 60 }, { x: 110, y: 90 });

  return stage.dispose;
};

export default mount;
