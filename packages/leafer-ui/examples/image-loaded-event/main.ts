// Image: listen for ImageEvent.LOADED
import { Image, ImageEvent, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { caption } from '../../shared/shapes.ts';
import { button, eventLog } from '../../shared/controls.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press new image to load again; the log lists each event.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const log = stage.bar ? eventLog(stage.box, 4) : () => {};
  const note = caption(stage, leafer);
  let image: Image | undefined;
  const run = (): void => {
    image?.destroy();
    note.text = 'loading...';
    image = new Image({ url: photo(), draggable: true, scale: stage.preview ? 0.4 : 0.7 });
    image.once(ImageEvent.LOADED, (e: ImageEvent) => {
      note.text = `LOADED: ${e.image.width} x ${e.image.height}`;
      log(`${ImageEvent.LOADED}: ${e.image.width} x ${e.image.height}, ready ${image!.ready}`);
    });
    leafer.add(image);
  };
  run();
  if (stage.bar) button(stage.bar, 'new image', run);
  else stage.every(2600, run);

  return stage.dispose;
};

export default mount;
