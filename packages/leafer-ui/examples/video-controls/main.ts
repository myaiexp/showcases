// Video: the four player methods and the paused / ended flags
import { Leafer } from 'leafer-ui';
import { Video } from '@leafer-in/video';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, clipBlob } from '../../shared/media-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Use the buttons. The clip is 2 s long and stops at its end.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'recording a 2 s clip...', true);

  const w = size(stage) * 1.6;
  const h = size(stage);
  clipBlob().then((blob) => {
    if (stage.disposed) return;
    const url = blobUrl(stage, blob);
    const video = new Video({ url, x: (stage.width - w) / 2, y: (stage.height - h) / 2 - 10, width: w, height: h });
    leafer.add(video);
    stage.loop(() => {
      const t = video.currentTime;
      say(`paused ${video.paused}   ended ${video.ended}   currentTime ${typeof t === 'number' ? t.toFixed(2) : '-'}`);
    });

    const steps: [string, () => void][] = [
      ['play()', () => video.play()],
      ['pause()', () => video.pause()],
      ['togglePlay()', () => video.togglePlay()],
      ['stop()', () => video.stop()],
    ];
    if (stage.bar) for (const [name, fn] of steps) button(stage.bar, name, fn);
    else {
      script(stage, async () => {
        for (const i of [0, 1, 0, 3, 2]) {
          steps[i]![1]();
          await stage.wait(i === 3 ? 900 : 1100);
        }
      });
    }
  });

  return stage.dispose;
};

export default mount;
