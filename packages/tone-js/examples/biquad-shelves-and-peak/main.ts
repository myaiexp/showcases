// BiquadFilter gain types: lowshelf, highshelf and peaking boost or cut
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { compactFlow, plot, RESPONSE_PLOT, responseLine } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Setting {
  type: 'lowshelf' | 'highshelf' | 'peaking';
  frequency: number;
  gain: number;
  Q: number;
}
const SETTINGS = {
  flat: { type: 'peaking', frequency: 1000, gain: 0, Q: 1 },
  'bass boost': { type: 'lowshelf', frequency: 250, gain: 12, Q: 1 },
  'treble boost': { type: 'highshelf', frequency: 3000, gain: 12, Q: 1 },
  'mid scoop': { type: 'peaking', frequency: 1000, gain: -18, Q: 0.7 },
} as const satisfies Record<string, Setting>;
type Name = keyof typeof SETTINGS;
const NAMES = Object.keys(SETTINGS) as Name[];
const TYPES = ['lowshelf', 'highshelf', 'peaking'] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });
  const pl = plot(stage, RESPONSE_PLOT);
  const redraw = (f: Tone.BiquadFilter): void => pl.set([responseLine(f.getFrequencyResponse(128))]);

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['BiquadFilter'],
    caption: 'BiquadFilter: gain changes one region',
    create: (src: Source) => {
      const f = new Tone.BiquadFilter({ type: 'peaking', frequency: 1000, gain: 0, Q: 1 }).toDestination();
      // Leave room for a 12 dB boost.
      src.out.gain.value = 0.3;
      src.out.connect(f);
      return f;
    },
    variants: NAMES.map((name) => ({
      label: name,
      detail: `${name}: ${SETTINGS[name].type} at ${SETTINGS[name].frequency} Hz, gain ${SETTINGS[name].gain} dB`,
      apply: (f: Tone.BiquadFilter) => f.set(SETTINGS[name]),
    })),
    onPlay: (f, time) => {
      const line = responseLine(f.getFrequencyResponse(128));
      stage.show(time, () => pl.set([line]));
    },
    controls: (f, bar) => {
      redraw(f);
      select(bar, 'type', TYPES, (t) => {
        f.type = t;
        redraw(f);
      }, 'peaking');
      slider(bar, 'frequency', 100, 6000, 50, 1000, (v) => {
        f.frequency.value = v;
        redraw(f);
      }, (v) => `${v} Hz`);
      slider(bar, 'gain', -18, 18, 1, 0, (v) => {
        f.gain.value = v;
        redraw(f);
      }, (v) => `${v} dB`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
