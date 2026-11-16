// Film: change playerOptions.speed while it plays
import { Leafer, ImageEvent } from 'leafer-ui';
import { Film, PaintFilm } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise speed to make every frame last longer.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({ url, ...mid(stage, S), width: S, height: S });
  leafer.add(film);
  const player = new PaintFilm(film);

  film.once(ImageEvent.LOADED, () => {
    const set = (v: number): void => {
      player.playerOptions.speed = v; // frame duration x speed
      say(`speed ${v}`);
    };
    if (stage.bar) slider(stage.bar, 'speed', 0.5, 6, 0.5, 1, set);
    else {
      const speeds = [1, 3, 6, 0.5];
      let i = 0;
      set(1);
      stage.every(2200, () => set(speeds[(i = (i + 1) % speeds.length)]!));
    }
  });

  return stage.dispose;
};

export default mount;
