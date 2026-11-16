// Image: natural size from the url
import { Image, ImageEvent, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { mid, caption } from '../../shared/shapes.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the picture. It keeps its natural 400 x 300 size (scaled to fit here).' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const image = new Image({ url: photo(), draggable: true, scale: stage.preview ? 0.4 : 0.8 });
  leafer.add(image);
  const note = caption(stage, leafer);
  image.once(ImageEvent.LOADED, () => {
    note.text = `loaded: ${image.width} x ${image.height}`;
    Object.assign(image, mid(stage, image.width! * image.scaleX!, image.height! * image.scaleY!));
  });

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      const { x, y, width, height } = image.getBounds();
      await ghost.drag({ x: x! + width! / 2, y: y! + height! / 2 }, { x: x! + width! / 2 + 40, y: y! + height! / 2 + 30 }, 700);
      await stage.wait(400);
      await ghost.drag({ x: x! + width! / 2 + 40, y: y! + height! / 2 + 30 }, { x: x! + width! / 2, y: y! + height! / 2 }, 700);
      await stage.wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
