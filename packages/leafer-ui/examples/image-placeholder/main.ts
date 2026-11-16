// Image: placeholderColor while loading or failed
import { Image, Leafer } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid, caption } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';
import { photo, BROKEN_IMAGE } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press reload to show the failed state again.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const image = new Image({ url: BROKEN_IMAGE, ...mid(stage, S * 1.1, S * 0.8), width: S * 1.1, height: S * 0.8, draggable: true, placeholderColor: 'rgba(120,120,120,0.2)' });
  leafer.add(image);
  const note = caption(stage, leafer);
  const run = (): void => {
    image.url = BROKEN_IMAGE;
    note.text = 'url fails: placeholder colour';
    stage.after(1200, () => {
      image.url = photo();
      note.text = 'url replaced: the picture loads';
    });
  };
  run();
  if (stage.bar) button(stage.bar, 'reload', run);
  else stage.every(3200, run);

  return stage.dispose;
};

export default mount;
