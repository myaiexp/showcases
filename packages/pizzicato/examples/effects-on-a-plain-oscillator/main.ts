// oscillator.connect(distortion), distortion.connect(...): an effect in a hand-built graph
import Pizzicato from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { releaseAll } from '../../shared/dispose.ts';
import { flow } from '../../shared/flow.ts';
import { pzStage } from '../../shared/stage.ts';
import { hz, keys } from '../../shared/widgets.ts';

const RIFF = [52, 55, 59, 64, 59, 55, 52, 47];
const STEP = 0.25;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: RIFF.length * STEP + 0.2 });
  const picture = flow(stage.visual, 'osc', ['Distortion', 'gain'], 'out');
  const piano = keys(stage.visual, 47, 64);
  piano.el.style.height = ctx.preview ? '30px' : '56px';
  piano.el.style.minHeight = ctx.preview ? '26px' : '56px';
  const say = (gain: number): void => picture.caption(`distortion.gain = ${gain.toFixed(2)}`);

  return stage.run({
    build: () => {
      const distortion = new Pizzicato.Effects.Distortion({ gain: 0.5 });
      // A plain gain node as the volume knob, then on to the master gain Pizzicato's sounds use.
      const level = Pizzicato.context.createGain();
      level.gain.value = 0.25;
      distortion.connect(level);
      level.connect(Pizzicato.masterGainNode);
      return { distortion, level, osc: null as OscillatorNode | null, type: 'sawtooth' as OscillatorType };
    },
    play: (g, at) => {
      releaseAll(g.osc);
      const context = Pizzicato.context;
      const osc = context.createOscillator();
      osc.type = g.type;
      // connect() accepts a Pizzicato effect, as the README shows (the typings only list nodes).
      osc.connect(g.distortion as unknown as AudioNode);
      const start = context.currentTime + 0.02;
      // Plain Web Audio scheduling: each note is a frequency change at a future time.
      const gain = g.distortion.gain;
      RIFF.forEach((midi, i) => {
        osc.frequency.setValueAtTime(hz(midi), start + i * STEP);
        at(0.02 + i * STEP, () =>
          stage.show(() => {
            RIFF.forEach((m) => piano.set(m, m === midi));
            say(gain);
          }),
        );
      });
      osc.start(start);
      osc.stop(start + RIFF.length * STEP);
      g.osc = osc;
      at(RIFF.length * STEP + 0.05, () => stage.show(() => RIFF.forEach((m) => piano.set(m, false))));
    },
    variants: [
      { label: 'gain 0.1: a little grit', apply: ({ distortion }) => (distortion.gain = 0.1) },
      { label: 'gain 0.5: crunch', apply: ({ distortion }) => (distortion.gain = 0.5) },
      { label: 'gain 0.95: full fuzz', apply: ({ distortion }) => (distortion.gain = 0.95) },
    ],
    controls: (g, bar) => {
      say(g.distortion.gain);
      slider(bar, 'distortion.gain', 0, 1, 0.01, g.distortion.gain, (v) => {
        g.distortion.gain = v;
        say(v);
      });
      slider(bar, 'volume', 0, 0.6, 0.01, g.level.gain.value, (v) => (g.level.gain.value = v));
      select(bar, 'oscillator', ['sawtooth', 'square', 'sine', 'triangle'] as const, (v) => (g.type = v));
    },
  });
};

export default mount;
