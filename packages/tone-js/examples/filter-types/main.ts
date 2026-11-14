// Filter types: lowpass, highpass, bandpass and notch carve a drum loop
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select, slider } from '../../shared/controls.ts';
import { compactFlow, plot, RESPONSE_PLOT, responseLine } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const TYPES = ['lowpass', 'highpass', 'bandpass', 'notch'] as const;
const DETAIL = {
  lowpass: 'lowpass: lets the lows through, rounds the hats off',
  highpass: 'highpass: lets the highs through, the kick thins out',
  bandpass: 'bandpass: only a band around the cutoff, like a telephone',
  notch: 'notch: everything but a narrow band around the cutoff',
} as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });
  const pl = plot(stage, RESPONSE_PLOT);
  const redraw = (f: Tone.Filter): void => pl.set([responseLine(f.getFrequencyResponse(96))]);

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['Filter'],
    caption: 'Filter: cutoff 1000 Hz',
    create: (src: Source) => {
      const f = new Tone.Filter({ frequency: 1000, type: 'lowpass', Q: 2 }).toDestination();
      src.out.gain.value = 0.6;
      src.out.connect(f);
      return f;
    },
    variants: TYPES.map((type) => ({
      label: type,
      detail: DETAIL[type],
      apply: (f: Tone.Filter) => (f.type = type),
    })),
    onPlay: (f, time) => {
      const line = responseLine(f.getFrequencyResponse(96));
      stage.show(time, () => pl.set([line]));
    },
    controls: (f, bar) => {
      redraw(f);
      select(bar, 'type', TYPES, (t) => {
        f.type = t;
        redraw(f);
      });
      slider(bar, 'cutoff', 100, 8000, 50, 1000, (v) => {
        f.frequency.value = v;
        redraw(f);
      }, (v) => `${v} Hz`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
