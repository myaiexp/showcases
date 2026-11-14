// A wave sound connected to an analyser: its spectrum drawn as bars while it glides up
import Pizzicato, { type Sound, type Wave } from 'pizzicato';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { pzStage } from '../../shared/stage.ts';
import { bigText } from '../../shared/widgets.ts';
import { bars } from './bars.ts';

const SECONDS = 3;
const STEPS = 24;
const WAVES = ['sine', 'square', 'sawtooth', 'triangle'] as const;

const mount: Mount = (el, ctx) => {
  const stage = pzStage(el, ctx, { seconds: SECONDS });
  const readout = bigText(stage.visual, ctx.preview ? 13 : 18);
  const spectrum = bars(stage.visual, ctx.preview ? 88 : 150);
  const frequencyAt = (i: number): number => 110 * 2 ** ((i / STEPS) * 3);
  let reading: { analyser: AnalyserNode; data: Uint8Array<ArrayBuffer> } | null = null;

  return stage.run({
    build: () => {
      // The README's recipe: an AnalyserNode from the context, and sound.connect() to feed it.
      const analyser = Pizzicato.context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.4;
      const make = (type: Wave): Sound => {
        const sound = new Pizzicato.Sound({ source: 'wave', options: { type, frequency: frequencyAt(0), volume: 0.4 } });
        sound.connect(analyser);
        return sound;
      };
      const g = {
        analyser,
        sound: make('sine'),
        type: 'sine' as Wave,
        setType(type: Wave): void {
          const wasPlaying = g.sound.playing;
          g.sound.stop();
          g.sound.disconnect();
          g.type = type;
          g.sound = make(type);
          if (wasPlaying) g.sound.play();
        },
      };
      reading = { analyser, data: new Uint8Array(analyser.frequencyBinCount) };
      return g;
    },
    play: (g, at) => {
      g.sound.frequency = frequencyAt(0);
      g.sound.play();
      for (let i = 0; i < STEPS; i++) {
        at(0.1 + (i * 2.4) / STEPS, () => {
          const freq = frequencyAt(i);
          g.sound.frequency = freq;
          // A card cannot poll the analyser every frame: read it now, draw it when its time comes.
          const data = stage.preview ? new Uint8Array(g.analyser.frequencyBinCount) : null;
          if (data) g.analyser.getByteFrequencyData(data);
          const rate = Pizzicato.context.sampleRate;
          stage.show(() => {
            if (data) spectrum.draw(data, rate);
            readout.textContent = `${g.type} · ${Math.round(freq)} Hz`;
          });
        });
      }
      at(2.7, () => {
        g.sound.stop();
        stage.show(spectrum.clear);
      });
    },
    stop: (g) => {
      g.sound.stop();
      spectrum.clear();
    },
    variants: [
      { label: 'sine wave', apply: (g) => g.setType('sine') },
      { label: 'square wave', apply: (g) => g.setType('square') },
      { label: 'sawtooth wave', apply: (g) => g.setType('sawtooth') },
    ],
    frame: () => {
      // Full view: read the analyser every animation frame.
      if (stage.preview || !reading) return;
      if (reading.data.length !== reading.analyser.frequencyBinCount) reading.data = new Uint8Array(reading.analyser.frequencyBinCount);
      reading.analyser.getByteFrequencyData(reading.data);
      spectrum.draw(reading.data, reading.analyser.context.sampleRate);
    },
    controls: (g, bar) => {
      readout.textContent = 'press Play';
      select(bar, 'wave', WAVES, (v) => g.setType(v));
      slider(bar, 'smoothing', 0, 0.95, 0.05, g.analyser.smoothingTimeConstant, (v) => (g.analyser.smoothingTimeConstant = v));
      select(bar, 'fftSize', ['512', '2048', '8192'] as const, (v) => (g.analyser.fftSize = Number(v)), '2048');
    },
  });
};

export default mount;
