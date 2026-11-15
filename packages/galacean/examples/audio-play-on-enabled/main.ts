// AudioSource.playOnEnabled: enabling the entity starts the sound
import { AudioManager, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { panel } from '../../shared/core-ui.ts';
import { add, quadMesh, tick } from '../../shared/gfx-kit.ts';
import { audioWorld, loadClip, melody } from '../../shared/audio-kit.ts';

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'The first press unlocks the browser\'s audio, then the entity toggles the sound.' });
  const loaded = await loadClip(w.stage, melody([392, 523, 659, 784], 0.25, 1.4));
  if (w.stage.engine.destroyed) return w.stage.dispose;
  const { entity, source } = w.speaker(loaded);
  // In a card the flag stays off: nothing may play there.
  source.playOnEnabled = !w.stage.preview;
  const move = w.scope(loaded);
  const info = panel(w.stage, 'tl');
  const lamp = new UnlitMaterial(w.stage.engine);
  add(w.root, quadMesh(w.stage.engine, 0.3, 0.3), lamp, [2.2, 1.1, 0.02], 'lamp');
  entity.isActive = false;
  tick(w.root, (_dt, t) => {
    if (w.stage.preview) {
      const on = t % 4 < 2.2;
      entity.isActive = on;
      move(on ? t % 4 : 0);
      lamp.baseColor.set(on ? 0.4 : 0.2, on ? 0.9 : 0.2, on ? 0.5 : 0.2, 1);
      info.text(`entity.isActive ${on}\nplayOnEnabled ${source.playOnEnabled} (silent card)`);
    } else {
      move(source.time);
      lamp.baseColor.set(source.isPlaying ? 0.4 : 0.2, source.isPlaying ? 0.9 : 0.2, source.isPlaying ? 0.5 : 0.2, 1);
      info.text(`entity.isActive ${entity.isActive}\nplayOnEnabled ${source.playOnEnabled}\nisPlaying ${source.isPlaying}`);
    }
  });
  if (!w.stage.preview) {
    button(w.stage.bar, 'Toggle entity', () => {
      void AudioManager.resume();
      entity.isActive = !entity.isActive;
    });
  }
  return w.stage.dispose;
};

export default mount;
