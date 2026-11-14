// Cutoff sweep: moving a filter's frequency over time opens or closes the sound
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { compactFlow, biquadResponse, plot, RESPONSE_PLOT } from '../../shared/curve-plot.ts';
import { fxSpec, type Source } from '../../shared/fx-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Sweep {
  type: 'lowpass' | 'highpass';
  from: number;
  to: number;
}
const SWEEPS = {
  'lowpass opens': { type: 'lowpass', from: 150, to: 6000 },
  'lowpass closes': { type: 'lowpass', from: 6000, to: 150 },
  'highpass rises': { type: 'highpass', from: 60, to: 3000 },
} as const satisfies Record<string, Sweep>;
type Name = keyof typeof SWEEPS;
const NAMES = Object.keys(SWEEPS) as Name[];
const LENGTH = 2;
const Q = 4;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.4 });
  const pl = plot(stage, RESPONSE_PLOT);
  // The sweep the current pass is playing: the picture follows it frame by frame.
  let sweep: Sweep | undefined;
  let chosen: Sweep = SWEEPS['lowpass opens'];

  const spec = fxSpec(stage, {
    source: 'riff',
    stages: ['Filter'],
    caption: 'Filter: frequency.exponentialRampTo(...)',
    create: (src: Source) => {
      const f = new Tone.Filter({ frequency: 150, type: 'lowpass', Q, rolloff: -24 }).toDestination();
      src.out.connect(f);
      return f;
    },
    variants: NAMES.map((name) => ({
      label: name,
      detail: `${name}: ${SWEEPS[name].from} Hz to ${SWEEPS[name].to} Hz`,
      apply: (f: Tone.Filter) => {
        chosen = SWEEPS[name];
        f.type = chosen.type;
      },
    })),
    onPlay: (f, time) => {
      const s = chosen;
      f.frequency.setValueAtTime(s.from, time);
      f.frequency.exponentialRampTo(s.to, LENGTH, time);
      stage.show(time, () => (sweep = s));
    },
    controls: (f, bar) => {
      pl.set([biquadResponse(chosen.type, chosen.from, Q)]);
      select(bar, 'sweep', NAMES, (name) => {
        chosen = SWEEPS[name];
        f.type = chosen.type;
        pl.set([biquadResponse(chosen.type, chosen.from, Q)]);
      });
    },
  });

  compactFlow(stage);

  return stage.run({
    ...spec,
    frame: (t) => {
      spec.frame?.(t);
      if (!sweep) return;
      const f = sweep.from * (sweep.to / sweep.from) ** Math.min(1, t / LENGTH);
      pl.set([biquadResponse(sweep.type, f, Q)]);
    },
  });
};

export default mount;
