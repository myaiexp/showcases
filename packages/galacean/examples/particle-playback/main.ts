// generator.play(), stop() with ParticleStopMode, emit(), simulationSpeed
import { ParticleStopMode } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, steps } from '../../shared/gfx-kit.ts';
import { button, slider } from '../../shared/controls.ts';
import { emitter, fxStage } from '../../shared/particle-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, root } = await fxStage(el, ctx);
  const say = caption(stage, '');
  const { gen } = emitter(stage, root, { tint: [0.5, 0.85, 1] });
  const act = (name: string, fn: () => void): void => {
    fn();
    say(name);
  };
  const moves: [string, () => void][] = [
    ['play()', () => gen.play()],
    ['stop(false, StopEmitting): live particles finish', () => gen.stop(false, ParticleStopMode.StopEmitting)],
    ['emit(12): twelve at once', () => gen.emit(12)],
    ['stop(false, StopEmittingAndClear): all vanish', () => gen.stop(false, ParticleStopMode.StopEmittingAndClear)],
  ];
  if (stage.preview) steps(root, 1.8, moves.length, (i) => act(...moves[i]!));
  else {
    for (const [name, fn] of moves) button(stage.bar, name.split(':')[0]!, () => act(name, fn));
    slider(stage.bar, 'simulationSpeed', 0.1, 3, 0.1, 1, (v) => (gen.main.simulationSpeed = v));
    say('use the buttons');
  }
  return stage.dispose;
};

export default mount;
