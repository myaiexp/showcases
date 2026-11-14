// Convolver: an impulse response of decaying noise, made in code, is a room
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow, plot } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const ROOMS = { 'no room': 0, 'small room': 0.35, 'big hall': 1.6 } as const;
type Name = keyof typeof ROOMS;
const NAMES = Object.keys(ROOMS) as Name[];

/** Noise that fades to nothing over `seconds`: what a room does to a single click. */
function impulse(seconds: number): Tone.ToneAudioBuffer {
  const rate = Tone.getContext().sampleRate;
  const n = Math.max(1, Math.round(seconds * rate));
  const data = new Float32Array(n);
  // A small seeded generator, so every render of the same room is identical.
  let seed = 1234567;
  const random = (): number => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let i = 0; i < n; i++) data[i] = (random() * 2 - 1) * Math.exp((-7 * i) / n);
  if (n === 1) data[0] = 1;
  return Tone.ToneAudioBuffer.fromArray(data);
}

/** Peaks of an impulse response in 160 slices, as top and bottom lines. */
function outline(buffer: Tone.ToneAudioBuffer | null): { top: number[]; bottom: number[] } {
  const data = buffer ? (buffer.toArray(0) as Float32Array) : new Float32Array(1);
  const slices = 160;
  const size = Math.max(1, Math.floor(data.length / slices));
  const top: number[] = [];
  for (let i = 0; i < slices; i++) {
    let peak = 0;
    for (let k = i * size; k < Math.min(data.length, (i + 1) * size); k++) peak = Math.max(peak, Math.abs(data[k]!));
    top.push(peak);
  }
  const peak = Math.max(...top, 1e-6);
  const scaled = top.map((v) => v / peak);
  return { top: scaled, bottom: scaled.map((v) => -v) };
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.4 });
  // The impulse response itself: one click, and the noise tail the room adds behind it.
  const pl = plot(stage, { yMin: -1.1, yMax: 1.1, guides: [0], corner: { top: 'impulse response (drawn as peaks)' } });
  const draw = (c: Tone.Convolver): void => {
    const { top, bottom } = outline(c.buffer);
    pl.set([{ y: top }, { y: bottom, color: '#7aa2ff' }]);
  };

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['Convolver'],
    caption: 'Convolver: the beat is stamped with the room',
    create: (src: Source) => {
      const c = new Tone.Convolver(impulse(ROOMS['small room'])).toDestination();
      src.out.gain.value = 0.7;
      src.out.connect(c);
      return c;
    },
    variants: NAMES.map((name) => ({
      label: name,
      detail: name === 'no room' ? 'impulse response: a single click' : `impulse response: ${ROOMS[name]} s of fading noise`,
      apply: (c: Tone.Convolver) => (c.buffer = impulse(ROOMS[name])),
    })),
    onPlay: (c, time) => {
      const shape = outline(c.buffer);
      stage.show(time, () => pl.set([{ y: shape.top }, { y: shape.bottom, color: '#7aa2ff' }]));
    },
    controls: (c, bar) => {
      draw(c);
      slider(bar, 'room length', 0.05, 2.5, 0.05, ROOMS['small room'], (v) => {
        c.buffer = impulse(v);
        draw(c);
      }, (v) => `${v} s`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
