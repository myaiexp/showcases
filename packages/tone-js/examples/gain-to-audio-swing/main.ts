// GainToAudio: stretches a 0 to 1 control into -1 to 1 for a two-way swing
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { burst, sampleParam, trace } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 150, yMax: 850, unit: 'Hz', guides: [500] });
  let stretched = true;

  return stage.run({
    build: () => {
      const control = new Tone.Signal(0);
      const toAudio = new Tone.GainToAudio();
      const times = new Tone.Multiply(300);
      const plus = new Tone.Add(500);
      const osc = new Tone.Oscillator({ type: 'triangle', frequency: 0, volume: -12 }).toDestination();
      toAudio.connect(times);
      times.chain(plus, osc.frequency);
      return { control, toAudio, times, plus, osc };
    },
    play: (g, time) => {
      g.control.disconnect();
      g.control.connect(stretched ? g.toAudio : g.times);
      g.control.cancelScheduledValues(time);
      g.control.setValueAtTime(0, time);
      g.control.linearRampTo(1, 2.5, time);
      const s = stretched;
      const hz = sampleParam(g.control, time, SECONDS).map((v) => 500 + 300 * (s ? 2 * v - 1 : v));
      view.show(time, [hz], s ? 'control 0 to 1 -> GainToAudio (-1 to 1) -> x300 + 500: pitch passes through the centre, 200 to 800' : 'control 0 to 1 straight into x300 + 500: only goes up, 500 to 800');
      burst(g.osc, time, SECONDS);
    },
    variants: [true, false].map((s) => ({
      label: s ? 'with GainToAudio' : 'plain 0 to 1',
      apply: () => {
        stretched = s;
      },
    })),
    controls: (_, bar) => void checkbox(bar, 'through GainToAudio (applies on the next pass)', stretched, (v) => (stretched = v)),
    frame: (t) => view.frame(t),
  });
};

export default mount;
