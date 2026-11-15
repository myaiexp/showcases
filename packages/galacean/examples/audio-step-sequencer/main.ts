// Several AudioSources triggered on a schedule: kick, snare and hat
import { AudioManager, PrimitiveMesh, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { add, tick } from '../../shared/gfx-kit.ts';
import { audioWorld, hat, kick, loadClip, snare } from '../../shared/audio-kit.ts';

const PATTERN = ['x...x...x...x.x.', '....x.......x...', 'x.x.x.x.x.x.x.xx'];
const NAMES = ['kick', 'snare', 'hat'];
const COLORS: [number, number, number][] = [[0.95, 0.45, 0.3], [0.4, 0.8, 0.95], [0.95, 0.85, 0.35]];

const mount: Mount = async (el, ctx) => {
  const w = await audioWorld(el, ctx, { hint: 'A step lasts 0.15 s; the pattern repeats every 16 steps.' });
  const samples = [kick(), snare(), hat()];
  const loaded = await Promise.all(samples.map((s) => loadClip(w.stage, s)));
  if (w.stage.engine.destroyed) return w.stage.dispose;
  const sources = loaded.map((l, i) => w.speaker(l, NAMES[i]).source);
  const pads = PATTERN.map((row, r) =>
    [...row].map((c, i) => {
      const m = new UnlitMaterial(w.stage.engine);
      m.baseColor.set(...COLORS[r]!.map((v) => v * (c === 'x' ? 0.45 : 0.1)) as [number, number, number], 1);
      add(w.root, PrimitiveMesh.createPlane(w.stage.engine, 0.28, 0.28), m, [(i - 7.5) * 0.32, (1 - r) * 0.4, 0], 'pad').entity.transform.setRotation(90, 0, 0);
      return m;
    }),
  );
  let running = w.stage.preview;
  let last = -1;
  let clock = 0;
  tick(w.root, (dt) => {
    if (!running) return;
    clock += dt;
    const step = Math.floor(clock / 0.15);
    if (step === last) return;
    last = step;
    const i = step % 16;
    PATTERN.forEach((row, r) => {
      pads[r]!.forEach((m, k) => {
        const on = row[k] === 'x';
        const hot = k === i;
        const base = on ? 0.45 : 0.1;
        m.baseColor.set(...(COLORS[r]!.map((v) => v * (hot ? (on ? 1.4 : 0.5) : base)) as [number, number, number]), 1);
      });
      if (row[i] === 'x' && !w.stage.preview) {
        sources[r]!.stop();
        sources[r]!.play();
      }
    });
  });
  if (!w.stage.preview) {
    button(w.stage.bar, 'Start beat', () => {
      void AudioManager.resume();
      running = true;
    });
    button(w.stage.bar, 'Stop beat', () => (running = false));
  }
  return w.stage.dispose;
};

export default mount;
