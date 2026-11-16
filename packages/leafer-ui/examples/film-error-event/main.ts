// Film: a broken file fires ImageEvent.ERROR and shows placeholderColor
import { Leafer, ImageEvent } from 'leafer-ui';
import { Film } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The blob holds text, not a GIF.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'loading...');

  const S = size(stage);
  const url = blobUrl(stage, new Blob(['this is not a gif'], { type: 'image/gif' }));
  const film = new Film({ url, ...mid(stage, S), width: S, height: S, placeholderColor: '#f4a261' });
  leafer.add(film);

  film.once(ImageEvent.ERROR, (e: ImageEvent) => {
    say(`ERROR: ready = ${Boolean(film.ready)}\nplaceholderColor shown instead`);
    console.debug('Film error event', e.type);
  });

  return stage.dispose;
};

export default mount;
