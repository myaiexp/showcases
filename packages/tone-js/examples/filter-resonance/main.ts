// Resonance: raising a filter's Q piles up a ringing peak right at the cutoff
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { compactFlow, plot, RESPONSE_PLOT, responseLine } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const QS = [1, 5, 10, 16] as const;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const pl = plot(stage, RESPONSE_PLOT);
  const redraw = (f: Tone.Filter): void => pl.set([responseLine(f.getFrequencyResponse(128))]);

  const spec = fxSpec(stage, {
    source: 'riff',
    stages: ['Filter'],
    caption: 'lowpass at 700 Hz, Q = 1',
    create: (src: Source) => {
      const f = new Tone.Filter({ frequency: 700, type: 'lowpass', Q: 1, rolloff: -12 }).toDestination();
      src.out.connect(f);
      return f;
    },
    variants: QS.map((q) => ({
      label: `Q ${q}`,
      detail: `Q ${q}: a ${q} dB boost at the cutoff`,
      apply: (f: Tone.Filter) => (f.Q.value = q),
    })),
    onPlay: (f, time) => {
      const line = responseLine(f.getFrequencyResponse(128));
      stage.show(time, () => pl.set([line]));
    },
    controls: (f, bar) => {
      redraw(f);
      slider(bar, 'Q', 0.5, 20, 0.5, 1, (v) => {
        f.Q.value = v;
        redraw(f);
      });
      slider(bar, 'cutoff', 200, 3000, 50, 700, (v) => {
        f.frequency.value = v;
        redraw(f);
      }, (v) => `${v} Hz`);
    },
  });
  compactFlow(stage);

  return stage.run(spec);
};

export default mount;
