// Film: fill { type: 'film' } in place of url
import { Leafer } from 'leafer-ui';
import { Film } from '@leafer-in/film'; // the film plugin: animated GIF (and WebP, APNG, AVIF)
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click to pause or play. The fill stretches the GIF over a 2:1 box.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const w = size(stage) * 1.6;
  const h = size(stage) * 0.8;
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({
    ...mid(stage, w, h),
    width: w,
    height: h,
    fill: { type: 'film', url, mode: 'stretch' }, // fill replaces url; setting both lets url win
  });
  leafer.add(film);
  film.on('click', () => film.togglePlay());

  if (stage.preview) {
    const ghost = stage.ghost(leafer);
    script(stage, async () => {
      await stage.wait(1600);
      await ghost.tap(stage.width / 2, stage.height / 2);
      await stage.wait(1000);
      await ghost.tap(stage.width / 2, stage.height / 2);
    });
  }

  return stage.dispose;
};

export default mount;
