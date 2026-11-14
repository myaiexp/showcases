// Scale, Pow and ScaleExp: three ways to turn a 0 to 1 control into pitch
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { burst, sampleParam, trace } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const MODES = ['Scale', 'Pow(3) then Scale', 'ScaleExp(0.4)'] as const;
type Mode = (typeof MODES)[number];
const CAPTION: Record<Mode, string> = {
  Scale: 'Scale(200, 1000): every step of the control moves the pitch the same amount',
  'Pow(3) then Scale': 'Pow(3) squeezes the control first: slow start, fast finish',
  'ScaleExp(0.4)': 'ScaleExp(200, 1000, 0.4): fast start, slow finish',
};
const shape = (mode: Mode, v: number): number => 200 + 800 * (mode === 'Scale' ? v : mode === 'ScaleExp(0.4)' ? Math.pow(v, 0.4) : Math.pow(v, 3));

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: 150, yMax: 1050, unit: 'Hz', guides: [200, 600, 1000] });
  let mode: Mode = 'Scale';

  return stage.run({
    build: () => {
      const control = new Tone.Signal(0);
      const osc = new Tone.Oscillator({ type: 'triangle', frequency: 0, volume: -12 }).toDestination();
      const scale = new Tone.Scale(200, 1000);
      const pow = new Tone.Pow(3);
      const powScale = new Tone.Scale(200, 1000);
      const scaleExp = new Tone.ScaleExp(200, 1000, 0.4);
      pow.connect(powScale);
      return { control, osc, scale, pow, powScale, scaleExp };
    },
    play: (g, time) => {
      // Re-wire so that only the chosen chain reaches the oscillator.
      g.control.disconnect();
      for (const n of [g.scale, g.powScale, g.scaleExp]) n.disconnect();
      if (mode === 'Scale') {
        g.control.connect(g.scale);
        g.scale.connect(g.osc.frequency);
      } else if (mode === 'ScaleExp(0.4)') {
        g.control.connect(g.scaleExp);
        g.scaleExp.connect(g.osc.frequency);
      } else {
        g.control.connect(g.pow);
        g.powScale.connect(g.osc.frequency);
      }
      g.control.cancelScheduledValues(time);
      g.control.setValueAtTime(0, time);
      g.control.linearRampTo(1, 2.5, time);
      const m = mode;
      view.show(time, [sampleParam(g.control, time, SECONDS).map((v) => shape(m, v))], CAPTION[m]);
      burst(g.osc, time, SECONDS);
    },
    variants: MODES.map((m) => ({
      label: m,
      apply: () => {
        mode = m;
      },
    })),
    controls: (_, bar) => select<Mode>(bar, 'shaping', MODES, (v) => (mode = v)),
    frame: (t) => view.frame(t),
  });
};

export default mount;
