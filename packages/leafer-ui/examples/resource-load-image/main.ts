// Resource: waiting for an image to load, then adding it
import { Image, Leafer, Resource } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';
import { label } from '../../shared/basics.ts';
import { photo } from '../../shared/images.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Load adds the image to the engine only after Resource.loadImage() resolved.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);
  const url = photo(); // a data: URL standing in for the docs' /image/leafer.jpg

  let image: Image | undefined;
  const run = (): void => {
    image?.destroy();
    image = undefined;
    say('Resource.loadImage(url) ...');
    Resource.loadImage(url).then((img) => {
      if (stage.disposed) return;
      say(`loaded ${img.width} x ${img.height}, adding to the leafer`);
      image = new Image({ url, x: stage.width * 0.15, y: 14, width: stage.width * 0.7, height: stage.height * 0.7, cornerRadius: 10 });
      leafer.add(image);
    });
  };
  run();
  if (stage.bar) button(stage.bar, 'load again', run);
  else stage.every(3000, run);
  return stage.dispose;
};

export default mount;
