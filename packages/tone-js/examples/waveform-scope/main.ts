// Waveform: getValue() is the wave's shape; two sines added make a new one
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { readout, slider } from '../../shared/controls.ts';
import { PINK } from '../../shared/routing-kit.ts';
import { barsCanvas, stable } from '../../shared/spectrum-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  a: Tone.Oscillator;
  b: Tone.Oscillator;
  gainA: Tone.Gain;
  gainB: Tone.Gain;
  wave: Tone.Waveform;
}

const MIXES = [
  { label: 'wave A alone', a: 1, b: 0 },
  { label: 'wave B alone', a: 0, b: 1 },
  { label: 'A + B added together', a: 1, b: 1 },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, hideScopeInCard: true });
  const view = barsCanvas(stage.visual, stage.preview ? 0 : 180);
  const note = readout(stage.visual, '');
  note.style.cssText += ';text-align:center;padding:2px';
  // A card's variant label already says which wave is playing.
  if (stage.preview) note.style.display = 'none';
  let live: Graph | undefined;
  let mix = { a: 1, b: 1 };

  return stage.run({
    build: (): Graph => {
      const gainA = new Tone.Gain(1).toDestination();
      const gainB = new Tone.Gain(1).toDestination();
      const a = new Tone.Oscillator({ frequency: 220, type: 'sine', volume: -8 }).connect(gainA);
      const b = new Tone.Oscillator({ frequency: 330, type: 'sine', volume: -8 }).connect(gainB);
      // The Waveform listens to what both gains send on to the speakers.
      const wave = new Tone.Waveform(512);
      gainA.connect(wave);
      gainB.connect(wave);
      live = { a, b, gainA, gainB, wave };
      return live;
    },
    play: (g, time) => {
      g.gainA.gain.value = mix.a;
      g.gainB.gain.value = mix.b;
      g.a.start(time);
      g.b.start(time);
      const m = { ...mix };
      stage.show(time, () => {
        note.textContent = m.a && m.b ? 'A (220 Hz) + B (330 Hz): the waves add sample by sample' : m.a ? 'A alone: 220 Hz sine' : 'B alone: 330 Hz sine';
      });
      return (end) => {
        g.a.stop(end);
        g.b.stop(end);
      };
    },
    dispose: (g) => {
      live = undefined;
      for (const n of [g.a, g.b, g.gainA, g.gainB, g.wave]) n.dispose();
    },
    variants: MIXES.map(({ label, ...m }) => ({
      label,
      apply: () => {
        mix = m;
      },
    })),
    controls: (g, box) => {
      slider(box, 'wave B pitch', 110, 660, 5, 330, (v) => (g.b.frequency.value = v), (v) => `${v} Hz`);
      slider(box, 'wave B level', 0, 1, 0.05, 1, (v) => { mix.b = v; g.gainB.gain.value = v; });
    },
    frame: () => {
      // A card reads silence from the Waveform node, so it draws the rendered sound instead.
      const samples = stage.preview ? stage.samples().subarray(-256) : live?.wave.getValue();
      if (samples) view.line(stable(samples, 256), PINK);
    },
  });
};

export default mount;
