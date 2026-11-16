// Video: the clip plays inside a Polygon's shape
import { Leafer, Polygon, ImageEvent } from 'leafer-ui';
import { PaintVideo } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { blobUrl, clipBlob, loopClip } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the hexagon to pause or play.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage) * 1.15;
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    const polygon = new Polygon({
      x: (stage.width - S) / 2,
      y: (stage.height - S) / 2,
      width: S,
      height: S,
      sides: 6,
      fill: { type: 'video', url, mode: 'stretch' },
    });
    leafer.add(polygon);
    const video = new PaintVideo(polygon);
    polygon.on('click', () => video.togglePlay());
    polygon.once(ImageEvent.LOADED, () => stage.after(50, () => video.play())); // the player exists once it has loaded
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
