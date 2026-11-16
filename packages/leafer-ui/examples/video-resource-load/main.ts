// Video: wait for Resource.loadVideo, then add the element
import { Leafer, Resource, ImageEvent } from 'leafer-ui';
import { Video } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, clipBlob, loopClip } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The Video is created only once the preload promise has resolved.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'recording a 2 s clip...', true);

  const w = size(stage) * 1.6;
  const h = size(stage);
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    say('Resource.loadVideo(url) ...');
    Resource.loadVideo(url).then(() => {
      if (stage.disposed) return;
      say('resolved: the Video is added and plays');
      const video = new Video({ url, pixelRatio: 2, x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 10, width: w, height: h });
      leafer.add(video);
      video.on('click', () => video.togglePlay());
      video.once(ImageEvent.LOADED, () => stage.after(50, () => video.play())); // playerOptions exist only once it has loaded
      loopClip(stage, video);
    });
  });

  return stage.dispose;
};

export default mount;
