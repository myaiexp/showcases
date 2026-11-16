// Film: play(), pause(), stop() and togglePlay()
import { Leafer } from 'leafer-ui';
import { Film, PaintFilm } from '@leafer-in/film';
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { size, mid } from '../../shared/shapes.ts';
import { label } from '../../shared/basics.ts';
import { blobUrl, spinnerBlob } from '../../shared/media-kit.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Use the buttons: stop() rewinds to frame 1 and leaves the film paused.' });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const say = label(stage, '', true);

  const S = size(stage);
  const url = blobUrl(stage, spinnerBlob());
  const film = new Film({ url, ...mid(stage, S), width: S, height: S });
  leafer.add(film);
  const player = new PaintFilm(film); // reads the live player state

  const show = (what: string): void => say(what + '  paused: ' + String(player.playerOptions?.paused ?? false));
  const steps: [string, () => void][] = [
    ['play()', () => film.play()],
    ['pause()', () => film.pause()],
    ['togglePlay()', () => film.togglePlay()],
    ['stop()', () => film.stop()],
  ];
  const run = ([name, fn]: [string, () => void]): void => {
    fn();
    show(name);
  };
  if (stage.bar) for (const s of steps) button(stage.bar, s[0], () => run(s));
  else {
    // Card: step through the calls with a pause between them.
    script(stage, async () => {
      for (const s of [steps[1]!, steps[0]!, steps[1]!, steps[3]!, steps[0]!]) {
        await stage.wait(1300);
        run(s);
      }
    });
  }

  return stage.dispose;
};

export default mount;
