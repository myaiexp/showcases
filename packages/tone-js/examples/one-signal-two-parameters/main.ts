// One Signal steers two parameters: pitch and pan follow one value
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { burst, sampleParam, trace } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const MOVES = ['sweep', 'back and forth'] as const;
type Move = (typeof MOVES)[number];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS, channels: 2 });
  const view = trace(stage, SECONDS, { yMin: 150, yMax: 1050, unit: 'Hz', guides: [200, 1000], caption: 'control 0 to 1 becomes pitch 200 to 1000 Hz and pan left to right' });
  let move: Move = 'sweep';

  return stage.run({
    build: () => {
      const control = new Tone.Signal(0);
      const toPitch = new Tone.Scale(200, 1000);
      const toPan = new Tone.Scale(-1, 1);
      const panner = new Tone.Panner(0).toDestination();
      const osc = new Tone.Oscillator({ type: 'triangle', frequency: 0, volume: -10 }).connect(panner);
      // The same control feeds both Scale nodes: one reaches the pitch, one the pan.
      control.connect(toPitch);
      control.connect(toPan);
      toPitch.connect(osc.frequency);
      toPan.connect(panner.pan);
      return { control, toPitch, toPan, panner, osc };
    },
    play: (g, time) => {
      const c = g.control;
      c.cancelScheduledValues(time);
      c.setValueAtTime(0, time);
      if (move === 'sweep') c.linearRampTo(1, 2.5, time);
      else c.setValueCurveAtTime([0, 1, 0.1, 1, 0], time, 2.5);
      const hz = sampleParam(c, time, SECONDS).map((v) => 200 + v * 800);
      view.show(time, [hz]);
      burst(g.osc, time, SECONDS);
    },
    variants: MOVES.map((m) => ({
      label: m,
      apply: () => {
        move = m;
      },
    })),
    controls: (_, bar) => select<Move>(bar, 'control moves', MOVES, (v) => (move = v)),
    frame: (t) => view.frame(t),
  });
};

export default mount;
