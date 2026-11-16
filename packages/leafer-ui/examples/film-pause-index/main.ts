// Film: play until a chosen frame, then pause on it
import { Leafer, ImageEvent } from 'leafer-ui';
import { Film, PaintFilm } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';
import { button, slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a frame and press Play to it: the film stops there by itself.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({ url, ...mid(stage, S), width: S, height: S });
  leafer.add(film);
  const player = new PaintFilm(film);

  film.once(ImageEvent.LOADED, () => {
    const playTo = (index: number): void => {
      film.stop(); // frame 0, paused
      player.playerOptions.pauseIndex = index; // pause when this frame is reached
      film.play();
      say(`pauseIndex ${index}`);
    };
    if (stage.bar) {
      let target = 6;
      slider(stage.bar, 'pauseIndex', 1, 11, 1, target, (v) => (target = v));
      button(stage.bar, 'Play to it', () => playTo(target));
      playTo(target);
    } else {
      const targets = [3, 8, 11];
      let i = 0;
      script(stage, async () => {
        playTo(targets[i++ % targets.length]!);
        await stage.wait(2200);
      });
    }
  });

  return stage.dispose;
};

export default mount;
