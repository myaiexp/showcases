// AudioToGain: a -1 to 1 wave becomes a 0 to 1 volume, a tremolo
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { burst, sampleFn, trace, wave } from '../../shared/signal-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 3;
const RATE = 3;

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const view = trace(stage, SECONDS, { yMin: -1.2, yMax: 1.2, digits: 2, guides: [0], unit: '' });
  let converted = true;

  return stage.run({
    build: () => {
      const amp = new Tone.Gain(0).toDestination();
      const tone = new Tone.Oscillator({ type: 'triangle', frequency: 330, volume: -8 }).connect(amp);
      const slow = new Tone.Oscillator({ type: 'sine', frequency: RATE });
      const toGain = new Tone.AudioToGain();
      slow.connect(toGain);
      return { amp, tone, slow, toGain };
    },
    play: (g, time) => {
      g.slow.disconnect();
      g.toGain.disconnect();
      if (converted) {
        g.slow.connect(g.toGain);
        g.toGain.connect(g.amp.gain);
      } else {
        g.slow.connect(g.amp.gain);
      }
      g.slow.start(time).stop(time + SECONDS);
      burst(g.tone, time, SECONDS);
      const c = converted;
      const w = (t: number): number => wave('sine', RATE, t);
      view.show(time, [sampleFn((t) => (c ? (w(t) + 1) / 2 : w(t)), SECONDS), sampleFn(w, SECONDS)], c ? 'volume = (wave + 1) / 2: swells between silence and full (dashed: the raw wave)' : 'raw wave as volume: it goes negative, which flips the sound upside down twice as often');
    },
    variants: [true, false].map((c) => ({
      label: c ? 'with AudioToGain' : 'raw wave',
      apply: () => {
        converted = c;
      },
    })),
    controls: (_, bar) => void checkbox(bar, 'through AudioToGain (applies on the next pass)', converted, (v) => (converted = v)),
    frame: (t) => view.frame(t),
  });
};

export default mount;
