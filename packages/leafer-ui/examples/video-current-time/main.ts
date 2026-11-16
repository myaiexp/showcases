// Video: scrub a paused video by setting currentTime
import { Leafer, ImageEvent } from 'leafer-ui';
import { Video } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, clipBlob, settleDuration } from '../../shared/media-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the clip is paused and jumps to that time.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'recording a 2 s clip...', true);

  const w = size(stage) * 1.6;
  const h = size(stage);
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    const video = new Video({ url, x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 10, width: w, height: h });
    leafer.add(video);
    video.once(ImageEvent.LOADED, async () => {
      // MediaRecorder writes no duration: the browser learns it after one seek to the end.
      await settleDuration(video.decoder.decoder as HTMLVideoElement);
      video.decoder.duration = (video.decoder.decoder as HTMLVideoElement).duration;
      const total = video.duration;
      const seek = (t: number): void => {
        video.currentTime = t;
        say(`currentTime ${t.toFixed(2)} of duration ${total.toFixed(2)} s`);
      };
      seek(0);
      if (stage.bar) slider(stage.bar, 'currentTime', 0, Math.floor(total * 20) / 20, 0.05, 0, seek);
      else {
        let t = 0;
        stage.every(160, () => seek((t = (t + 0.2) % total)));
      }
    });
  });

  return stage.dispose;
};

export default mount;
