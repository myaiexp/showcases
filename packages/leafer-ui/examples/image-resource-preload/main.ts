// Image: preload through the resource system
import { Image, Leafer, Resource } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press preload and add to run the sequence again.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const note = caption(stage, leafer);
  let image: Image | undefined;
  const run = (): void => {
    image?.destroy();
    image = undefined;
    const url = photo();
    note.text = 'Resource.loadImage(url) ...';
    Resource.loadImage(url).then(() => {
      if (stage.disposed) return;
      note.text = 'loaded: now add the Image';
      image = new Image({ url, draggable: true, scale: stage.preview ? 0.4 : 0.7 });
      leafer.add(image);
      image.set(mid(stage, 400 * image.scaleX!, 300 * image.scaleY!));
    });
  };
  run();
  if (stage.bar) button(stage.bar, 'preload and add', run);
  else stage.every(2600, run);

  return stage.dispose;
};

export default mount;
