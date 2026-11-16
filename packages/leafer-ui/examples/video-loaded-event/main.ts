// Video: ImageEvent.LOADED, then canplaythrough on the video element
import { Leafer, ImageEvent } from 'leafer-ui';
import { Video } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, clipBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both events fire once, right after the clip is recorded.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'recording a 2 s clip...');

  const w = size(stage) * 1.6;
  const h = size(stage);
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    const video = new Video({ url, x: (stage.width - w) / 2, y: (stage.height - h) / 2, width: w, height: h });
    leafer.add(video);
    say('waiting for ImageEvent.LOADED...');
    video.once(ImageEvent.LOADED, () => {
      const dom = video.decoder.decoder as HTMLVideoElement;
      if (dom.readyState !== 4) {
        say(`LOADED, readyState ${dom.readyState}: buffering`);
        dom.addEventListener('canplaythrough', () => say('canplaythrough: buffered, plays smoothly'), { once: true });
      } else say('LOADED, readyState 4: buffered, plays smoothly');
    });
  });

  return stage.dispose;
};

export default mount;
