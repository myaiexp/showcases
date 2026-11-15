// AudioSource.loop: wrap round at the end, or stop
import { AudioManager } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { audioWorld, loadClip, melody } from '../../shared/audio-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'Play it once with loop off, then with loop on.' });
  const loaded = await loadClip(w.stage, melody([523, 659, 784], 0.25, 0.9));
  if (w.stage.engine.destroyed) return w.stage.dispose;
  const { source } = w.speaker(loaded);
  const move = w.scope(loaded);
  const info = panel(w.stage, 'tl');
  tick(w.root, (_dt, t) => {
    if (w.stage.preview) {
      const looping = t % 10 >= 5;
      const local = t % 5;
      const time = looping ? local % loaded.clip.duration : Math.min(local, loaded.clip.duration);
      const playing = looping || local < loaded.clip.duration;
      move(playing ? time : 0);
      info.text(`loop ${looping}\nisPlaying ${playing}\ntime ${(playing ? time : 0).toFixed(2)} s`);
      return;
    }
    move(source.time);
    info.text(`loop ${source.loop}\nisPlaying ${source.isPlaying}\ntime ${source.time.toFixed(2)} s`);
  });
  if (!w.stage.preview) {
    checkbox(w.stage.bar, 'loop', false, (v) => (source.loop = v));
    button(w.stage.bar, 'play()', () => {
      void AudioManager.resume();
      source.play();
    });
    button(w.stage.bar, 'stop()', () => source.stop());
  }
  return w.stage.dispose;
};

export default mount;
