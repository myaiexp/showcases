// Film: an element that plays an animated GIF, click to pause or play
import { Leafer } from 'leafer-ui';
import { Film } from '@leafer-in/film'; // the film plugin: animated GIF (and WebP, APNG, AVIF)
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click the film to pause or play it.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob()); // the docs use '/film/color.gif'; Blob and data URLs both work
  const film = new Film({ url, ...mid(stage, S), width: S, height: S });
  leafer.add(film);

  film.on('click', () => film.togglePlay()); // pause or play

  if (stage.preview) {
    // No pointer in a card: a simulated click pauses the film, and another resumes it.
    const ghost = stage.ghost(leafer);
    const at = { x: stage.width / 2, y: stage.height / 2 };
    script(stage, async () => {
      await stage.wait(1800);
      await ghost.tap(at.x, at.y);
      await stage.wait(1200);
      await ghost.tap(at.x, at.y);
    });
  }

  return stage.dispose;
};

export default mount;
