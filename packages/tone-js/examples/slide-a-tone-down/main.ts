// Slide a tone down: osc.frequency.rampTo("C2", 2) glides from C4 two octaves down
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const FROM = 261.63; // C4
const TO = 65.41; // C2

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 3.5 });
  const label = bigLabel(stage.visual, 'C4');

  return stage.run({
    build: () => new Tone.Oscillator({ volume: -10 }).toDestination(),

    play: (osc, time) => {
      // Start at "C4", ramp to "C2" over 2 seconds, and play for 3 seconds.
      osc.frequency.setValueAtTime('C4', time);
      osc.frequency.rampTo('C2', 2, time);
      osc.start(time).stop(time + 3);
    },
    stop: (osc, time) => osc.stop(time),

    // A frequency ramp is exponential, so the readout follows the same curve.
    frame: (t) => {
      const hz = t >= 2 ? TO : FROM * Math.pow(TO / FROM, t / 2);
      label.textContent = t > 3 ? 'silence' : `${hz.toFixed(1)} Hz`;
    },
  });
};

export default mount;
