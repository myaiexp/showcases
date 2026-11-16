// Film: listen for ImageEvent.LOADED
import { Leafer, ImageEvent } from 'leafer-ui';
import { Film, PaintFilm } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The event fires once, as soon as the GIF is decoded.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'waiting for ImageEvent.LOADED...');

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({ url, ...mid(stage, S), width: S, height: S });
  leafer.add(film);

  film.once(ImageEvent.LOADED, (e: ImageEvent) => {
    say(`LOADED  type ${e.type}, ${new PaintFilm(film).decoder.total} frames`);
  });

  return stage.dispose;
};

export default mount;
