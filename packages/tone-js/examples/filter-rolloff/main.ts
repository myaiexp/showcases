// Rolloff: one lowpass cutoff with a gentle slope or a cliff, -12 to -96
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { compactFlow, plot, RESPONSE_PLOT, responseLine } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const ROLLOFFS = [-12, -24, -48, -96] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.2 });
  const pl = plot(stage, RESPONSE_PLOT);
  const redraw = (f: Tone.Filter): void => pl.set([responseLine(f.getFrequencyResponse(96))]);

  const spec = fxSpec(stage, {
    source: 'drums',
    stages: ['Filter'],
    caption: 'lowpass at 500 Hz',
    create: (src: Source) => {
      const f = new Tone.Filter({ frequency: 500, type: 'lowpass', Q: 0.5, rolloff: -12 }).toDestination();
      src.out.gain.value = 0.6;
      src.out.connect(f);
      return f;
    },
    variants: ROLLOFFS.map((r) => ({
      label: `${r} dB/oct`,
      detail: `rolloff ${r}: drops ${-r} dB for every octave above 500 Hz`,
      apply: (f: Tone.Filter) => (f.rolloff = r),
    })),
    onPlay: (f, time) => {
      const line = responseLine(f.getFrequencyResponse(96));
      stage.show(time, () => pl.set([line]));
    },
    controls: (f, bar) => {
      redraw(f);
      select(bar, 'rolloff', ROLLOFFS.map(String), (r) => {
        f.rolloff = Number(r) as (typeof ROLLOFFS)[number];
        redraw(f);
      }, '-12');
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
