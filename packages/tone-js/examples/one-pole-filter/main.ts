// OnePoleFilter: a lowpass or highpass with a soft 6 dB per octave slope
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { compactFlow, plot, RESPONSE_PLOT, responseLine } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SETTINGS = {
  'lowpass 1 kHz': { type: 'lowpass', frequency: 1000 },
  'highpass 1 kHz': { type: 'highpass', frequency: 1000 },
  'lowpass 250 Hz': { type: 'lowpass', frequency: 250 },
} as const;
type Name = keyof typeof SETTINGS;
const NAMES = Object.keys(SETTINGS) as Name[];

/** The filter's curve, and the steeper -12 dB Tone.Filter at the same cutoff as a dashed guide. */
function lines(f: Tone.OnePoleFilter): ReturnType<typeof responseLine>[] {
  const ref = new Tone.Filter({ type: f.type, frequency: f.frequency, Q: 0.7 });
  const out = [responseLine(f.getFrequencyResponse(128)), responseLine(ref.getFrequencyResponse(128), { dashed: true })];
  ref.dispose();
  return out;
}

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });
  const pl = plot(stage, { ...RESPONSE_PLOT, corner: { top: 'dashed: Filter at -12 dB/oct', bottom: '-60 dB' } });

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['OnePoleFilter'],
    caption: 'OnePoleFilter: 6 dB per octave',
    create: (src: Source) => {
      const f = new Tone.OnePoleFilter(1000, 'lowpass').toDestination();
      src.out.gain.value = 0.7;
      src.out.connect(f);
      return f;
    },
    variants: NAMES.map((name) => ({
      label: name,
      detail: `${name}: a slow slope, it cuts gently`,
      apply: (f: Tone.OnePoleFilter) => {
        f.type = SETTINGS[name].type;
        f.frequency = SETTINGS[name].frequency;
      },
    })),
    onPlay: (f, time) => {
      const ls = lines(f);
      stage.show(time, () => pl.set(ls));
    },
    controls: (f, bar) => {
      pl.set(lines(f));
      select(bar, 'type', ['lowpass', 'highpass'] as const, (t) => {
        f.type = t;
        pl.set(lines(f));
      });
      slider(bar, 'frequency', 100, 6000, 50, 1000, (v) => {
        f.frequency = v;
        pl.set(lines(f));
      }, (v) => `${v} Hz`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
