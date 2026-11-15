// AudioSource.volume and mute: unmute restores the previous volume
import { AudioManager, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button, checkbox, slider } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { add, quadMesh, tick } from '../../shared/gfx-kit.ts';
import { audioWorld, loadClip, melody } from '../../shared/audio-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'Press play, then drag the volume or tick mute.' });
  const loaded = await loadClip(w.stage, melody([330, 392, 494, 392, 330, 262], 0.3, 2));
  if (w.stage.engine.destroyed) return w.stage.dispose;
  const { source } = w.speaker(loaded);
  source.loop = true;
  const move = w.scope(loaded);
  const info = panel(w.stage, 'tl');
  const level = new UnlitMaterial(w.stage.engine);
  level.baseColor.set(0.35, 0.85, 0.5, 1);
  const bar = add(w.root, quadMesh(w.stage.engine, 5, 0.18), level, [0, -1.3, 0.02], 'level').entity;
  tick(w.root, (_dt, t) => {
    if (w.stage.preview) {
      source.volume = (Math.sin(t * 1.2) + 1) / 2;
      source.mute = t % 8 > 6;
    }
    const shown = source.mute ? 0 : source.volume;
    bar.transform.setScale(Math.max(0.001, shown), 1, 1);
    bar.transform.setPosition(-2.5 + shown * 2.5, -1.3, 0.02);
    move(w.stage.preview ? t % loaded.clip.duration : source.time);
    info.text(`volume ${source.volume.toFixed(2)}   mute ${source.mute}\neffective level ${shown.toFixed(2)}`);
  });
  if (!w.stage.preview) {
    slider(w.stage.bar, 'volume', 0, 1, 0.01, 1, (v) => (source.volume = v), (v) => v.toFixed(2));
    checkbox(w.stage.bar, 'mute', false, (v) => (source.mute = v));
    button(w.stage.bar, 'Play (loop)', () => {
      void AudioManager.resume();
      source.play();
    });
  }
  return w.stage.dispose;
};

export default mount;
