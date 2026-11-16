// Video: fill { type: 'video' } in place of url
import { Leafer, ImageEvent } from 'leafer-ui';
import { Video } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { blobUrl, clipBlob, loopClip } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click to pause or play. The fill stretches the clip over a wide box.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = size(stage) * 2;
  const h = size(stage) * 0.6;
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    const video = new Video({
      x: (stage.width - w) / 2,
      y: (stage.height - h) / 2,
      width: w,
      height: h,
      fill: { type: 'video', url, mode: 'stretch' }, // fill replaces url
    });
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
