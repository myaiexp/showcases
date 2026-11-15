// AudioSource.playbackRate: the same clip faster or slower
import { AudioManager } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { audioWorld, loadClip, melody } from '../../shared/audio-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'Change the rate while it plays.' });
  const loaded = await loadClip(w.stage, melody([262, 392, 330, 523, 392, 659], 0.3, 2));
  if (w.stage.engine.destroyed) return w.stage.dispose;
  const { source } = w.speaker(loaded);
  source.loop = true;
  const move = w.scope(loaded);
  const info = panel(w.stage, 'tl');
  let simulated = 0;
  tick(w.root, (dt, t) => {
    let time = source.time;
    if (w.stage.preview) {
      source.playbackRate = [0.5, 1, 2, 1][Math.floor(t / 3) % 4]!;
      simulated = (simulated + dt * source.playbackRate) % loaded.clip.duration;
      time = simulated;
    }
    move(time);
    info.text(`playbackRate ${source.playbackRate.toFixed(2)}\none pass: ${(loaded.clip.duration / source.playbackRate).toFixed(2)} s of ${loaded.clip.duration.toFixed(2)} s`);
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'playbackRate', 0.25, 3, 0.05, 1, (v) => (source.playbackRate = v), (v) => v.toFixed(2));
    button(w.stage.bar, 'Play (loop)', () => {
      void AudioManager.resume();
      source.play();
    });
    button(w.stage.bar, 'Stop', () => source.stop());
  }
  return w.stage.dispose;
};

export default mount;
