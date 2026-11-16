// Image: listen for ImageEvent.ERROR
import { Image, ImageEvent, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { mid, caption } from '../../shared/shapes.ts';
import { button, eventLog } from '../../shared/controls.ts';
import { BROKEN_IMAGE } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press retry to fail again.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const log = stage.bar ? eventLog(stage.box, 4) : () => {};
  const note = caption(stage, leafer);
  let image: Image | undefined;
  const run = (): void => {
    image?.destroy();
    note.text = 'loading a broken url...';
    image = new Image({ url: BROKEN_IMAGE, width: 120, height: 90, placeholderColor: '#FF4B4B55', ...mid(stage, 120, 90) });
    image.once(ImageEvent.ERROR, (e: ImageEvent) => {
      const why = typeof e.error === 'string' ? e.error : JSON.stringify(e.error);
      note.text = 'ERROR event fired';
      log(`${ImageEvent.ERROR}: ${why.slice(0, 80)}`);
    });
    leafer.add(image);
  };
  run();
  if (stage.bar) button(stage.bar, 'retry', run);
  else stage.every(2400, run);

  return stage.dispose;
};

export default mount;
