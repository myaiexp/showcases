// Subtract and Negate: a rising pitch and its falling mirror image
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { burst, sampleParam, trace } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS, channels: 2 });
  const view = trace(stage, SECONDS, { yMin: 100, yMax: 900, unit: 'Hz', guides: [500], caption: 'left ear rises; right ear is 1000 minus it: Subtract(1000) then Negate' });

  return stage.run({
    build: () => {
      const control = new Tone.Signal(200);
      const left = new Tone.Oscillator({ type: 'triangle', frequency: 0, volume: -12 }).connect(new Tone.Panner(-1).toDestination());
      const right = new Tone.Oscillator({ type: 'triangle', frequency: 0, volume: -12 }).connect(new Tone.Panner(1).toDestination());
      const minus = new Tone.Subtract(1000);
      const flip = new Tone.Negate();
      control.connect(left.frequency);
      control.chain(minus, flip, right.frequency);
      return { control, left, right, minus, flip };
    },
    play: (g, time) => {
      g.control.cancelScheduledValues(time);
      g.control.setValueAtTime(200, time);
      g.control.linearRampTo(800, 2.5, time);
      const rising = sampleParam(g.control, time, SECONDS);
      view.show(time, [rising, rising.map((v) => 1000 - v)]);
      burst(g.left, time, SECONDS);
      burst(g.right, time, SECONDS);
    },
    frame: (t) => view.frame(t),
  });
};

export default mount;
