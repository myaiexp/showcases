// Video: the element plays a clip, click to pause or play
import { Leafer, ImageEvent } from 'leafer-ui';
import { Video } from '@leafer-in/video'; // the video plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, clipBlob, loopClip } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The 2 s clip is recorded in your browser first. Click the video to pause or play.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'recording a 2 s clip...', true);

  const w = size(stage) * 1.6;
  const h = size(stage);
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    say('');
    const url = blobUrl(stage, blob); // the docs use '/video/forest.mp4'; a Blob URL works as well
    const video = new Video({ url, x: (stage.width - w) / 2, y: (stage.height - h) / 2, width: w, height: h });
    leafer.add(video);
    video.on('click', () => video.togglePlay());
    video.once(ImageEvent.LOADED, () => stage.after(50, () => video.play())); // playerOptions exist only once it has loaded
    loopClip(stage, video);
    if (stage.preview) {
    const ghost = stage.ghost(leafer);
    const c = { x: stage.width / 2, y: stage.height / 2 };
    script(stage, async () => {
      await stage.wait(1500);
      await ghost.tap(c.x, c.y);
      await stage.wait(1000);
      await ghost.tap(c.x, c.y);
    });
    }
  });

  return stage.dispose;
};

export default mount;
