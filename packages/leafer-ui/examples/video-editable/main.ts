// Video: the docs' App form with editable: true
import { App, ImageEvent } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import { Video } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, toggle } from '../../shared/shapes.ts';
import { blobUrl, clipBlob, loopClip } from '../../shared/media-kit.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the video to select it (and toggle play); drag it or pull a handle.' });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const w = size(stage) * 1.4;
  const h = size(stage) * 0.875;
  const place = { x: (stage.width - w) / 2, y: (stage.height - h) / 2, width: w, height: h };
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    const video = new Video({ url, ...place, editable: true });
    app.tree.add(video);
    video.on('click', () => video.togglePlay());
    video.once(ImageEvent.LOADED, () => stage.after(50, () => video.play())); // playerOptions exist only once it has loaded
    loopClip(stage, video);
    if (stage.preview) {
      const ghost = stage.ghost(app);
      const c = { x: stage.width / 2, y: stage.height / 2 };
      script(stage, async () => {
        video.set(place);
        await stage.wait(1500);
        await ghost.tap(c.x, c.y);
        await stage.wait(500);
        await ghost.drag(c, { x: c.x - 30, y: c.y + 10 }, 700);
        await stage.wait(900);
        await ghost.tap(10, 10);
        await stage.wait(600);
      });
    }
  });

  return stage.dispose;
};

export default mount;
