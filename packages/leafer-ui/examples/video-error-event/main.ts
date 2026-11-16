// Video: a broken file fires ImageEvent.ERROR and shows placeholderColor
import { Leafer, ImageEvent } from 'leafer-ui';
import { Video } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blob holds text, not a video.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'loading...');

  const w = size(stage) * 1.6;
  const h = size(stage);
  const url = blobUrl(stage, new Blob(['this is not a video'], { type: 'video/webm' }));
  const video = new Video({ url, x: (stage.width - w) / 2, y: (stage.height - h) / 2, width: w, height: h, placeholderColor: '#f4a261' });
  leafer.add(video);
  video.once(ImageEvent.ERROR, () => say(`ERROR: ready = ${Boolean(video.ready)}\nplaceholderColor shown instead`));
  say('waiting for ImageEvent.ERROR (the browser may take a moment)...');

  return stage.dispose;
};

export default mount;
