// Video: a Rect with a video fill, controlled through PaintVideo
import { Leafer, Rect, ImageEvent } from 'leafer-ui';
import { PaintVideo } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { blobUrl, clipBlob, loopClip } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the rounded rect to pause or play.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = size(stage) * 1.6;
  const h = size(stage);
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    const rect = new Rect({
      x: (stage.width - w) / 2,
      y: (stage.height - h) / 2,
      width: w,
      height: h,
      cornerRadius: 24,
      fill: { type: 'video', url, mode: 'stretch' },
    });
    leafer.add(rect);
    const video = new PaintVideo(rect); // the player behind the fill
    rect.on('click', () => video.togglePlay());
    rect.once(ImageEvent.LOADED, () => stage.after(50, () => video.play())); // the player exists once it has loaded
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
