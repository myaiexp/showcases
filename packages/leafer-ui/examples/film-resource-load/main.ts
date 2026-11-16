// Film: wait for Resource.loadFilm, then add the element
import { Leafer, Resource } from 'leafer-ui';
import { Film } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The film is created only once the preload promise has resolved.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'Resource.loadFilm(url) ...');

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob());
  Resource.loadFilm(url).then(() => {
    if (stage.disposed) return;
    say('resolved: the Film is added');
    leafer.add(new Film({ url, ...mid(stage, S), width: S, height: S }));
  });

  return stage.dispose;
};

export default mount;
