// Film: pause, then seekFrame() to any frame up to decoder.total
import { Leafer, ImageEvent } from 'leafer-ui';
import { Film, PaintFilm } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the slider: the film is paused and shows the frame you pick.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, 'loading...', true);

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({ url, ...mid(stage, S), width: S, height: S });
  leafer.add(film);

  film.once(ImageEvent.LOADED, () => {
    const total = new PaintFilm(film).decoder.total; // the frame count
    film.pause();
    const seek = (i: number): void => {
      film.seekFrame(i);
      say(`seekFrame(${i})   total ${total}`);
    };
    seek(0);
    if (stage.bar) slider(stage.bar, 'frame', 0, total - 1, 1, 0, seek);
    else {
      let i = 0;
      stage.every(450, () => seek((i = (i + 5) % total)));
    }
  });

  return stage.dispose;
};

export default mount;
