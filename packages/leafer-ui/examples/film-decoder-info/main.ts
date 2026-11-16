// Film: read the decoder once the film is ready
import { Leafer, ImageEvent } from 'leafer-ui';
import { Film, PaintFilm } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The numbers come from film.decoder and film.ready.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'ready: false');

  const S = size(stage) * 0.8;
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({ url, x: stage.width / 2 - S / 2, y: stage.height * 0.3, width: S, height: S });
  leafer.add(film);

  film.once(ImageEvent.LOADED, () => {
    const { width, height, total, loop, frames } = new PaintFilm(film).decoder; // the IFilmDecoder
    say(
      `ready: ${film.ready}\n` +
        `decoder ${width} x ${height}, total ${total}, loop ${loop}\n` +
        `frame durations: ${frames.slice(0, 3).map((f: { duration: number }) => f.duration).join(', ')}...`,
    );
  });

  return stage.dispose;
};

export default mount;
