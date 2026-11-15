// AssetType.Audio: WAV bytes made in code, loaded as an AudioClip
import { AudioManager } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { tick } from '../../shared/gfx-kit.ts';
import { audioWorld, loadClip, melody } from '../../shared/audio-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'The sound is a plucked arpeggio, built from sine waves in code.' });
  const loaded = await loadClip(w.stage, melody([262, 330, 392, 523, 392, 330], 0.32, 2.2));
  if (w.stage.engine.destroyed) return w.stage.dispose;
  const { clip } = loaded;
  const { source } = w.speaker(loaded);
  const move = w.scope(loaded);
  const info = panel(w.stage, 'tl');
  tick(w.root, (_dt, t) => {
    move(w.stage.preview ? t % clip.duration : source.time);
    info.text(`clip.name   ${clip.name || '(unnamed)'}\nduration    ${clip.duration.toFixed(2)} s\nchannels    ${clip.channels}\nsampleRate  ${clip.sampleRate} Hz`);
  });
  if (!w.stage.preview) {
    button(w.stage.bar, 'Play', () => {
      void AudioManager.resume();
      source.play();
    });
    button(w.stage.bar, 'Stop', () => source.stop());
  }
  return w.stage.dispose;
};

export default mount;
