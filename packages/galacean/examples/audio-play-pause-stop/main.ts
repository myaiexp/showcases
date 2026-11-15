// AudioSource.play, pause and stop, with isPlaying and time read back
import { AudioManager } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { audioWorld, loadClip, melody } from '../../shared/audio-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'play() after pause() carries on from where it stopped; stop() starts over.' });
  const loaded = await loadClip(w.stage, melody([392, 440, 494, 587, 494, 440], 0.4, 2.8));
  if (w.stage.engine.destroyed) return w.stage.dispose;
  const { source } = w.speaker(loaded);
  const move = w.scope(loaded);
  const info = panel(w.stage, 'tl');
  // Card: a replay script (never calling play) of play 0-1.4 s, pause 1.4-2.2, play 2.2-3.2, stop.
  const script = (t: number): { playing: boolean; time: number; action: string } => {
    const c = t % 6;
    if (c < 1.4) return { playing: true, time: c, action: 'play()' };
    if (c < 2.4) return { playing: false, time: 1.4, action: 'pause()' };
    if (c < 3.8) return { playing: true, time: 1.4 + (c - 2.4), action: 'play()' };
    return { playing: false, time: 0, action: 'stop()' };
  };
  tick(w.root, (_dt, t) => {
    const s = w.stage.preview ? script(t) : { playing: source.isPlaying, time: source.time, action: '' };
    move(s.time);
    info.text(`${s.action ? `replay: ${s.action}\n` : ''}isPlaying ${s.playing}\ntime      ${s.time.toFixed(2)} s`);
  });
  if (!w.stage.preview) {
    button(w.stage.bar, 'play()', () => {
      void AudioManager.resume();
      source.play();
    });
    button(w.stage.bar, 'pause()', () => source.pause());
    button(w.stage.bar, 'stop()', () => source.stop());
  }
  return w.stage.dispose;
};

export default mount;
