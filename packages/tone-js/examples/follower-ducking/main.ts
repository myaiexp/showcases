// Follower: turns each kick's loudness into a signal that ducks a pad
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { BLUE, PINK, bar, column } from '../../shared/routing-kit.ts';
import { probe, valueAt, type Probe } from '../../shared/stereo-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 2;
interface Graph {
  kick: Tone.MembraneSynth;
  pad: Tone.PolySynth;
  follower: Tone.Follower;
  invert: Tone.Multiply;
  duck: Tone.Gain;
  dc: Tone.DCMeter;
}

const mount: Mount = async (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const col = column(stage.visual, 10);
  const followBar = bar(col, 'follower', PINK);
  const padBar = bar(col, 'pad gain', BLUE);
  let live: Graph | undefined;
  let amount = 3;
  let shown = 3;

  // The Follower reads silence in a card, so a card renders the kicks into a Follower on
  // its own and reads the Follower's output from that.
  let measured: Probe | null = null;
  if (ctx.preview) {
    measured = await probe(stage, SECONDS, 1, () => {
      const kick = new Tone.MembraneSynth({ volume: -8 });
      kick.connect(new Tone.Follower(0.1)).toDestination();
      for (let i = 0; i < 4; i++) kick.triggerAttackRelease('C1', 0.2, i * 0.5);
    });
  }

  return stage.run({
    build: (): Graph => {
      const kick = new Tone.MembraneSynth({ volume: -8 }).toDestination();
      const pad = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'sawtooth' }, volume: -16 });
      const duck = new Tone.Gain(1).toDestination();
      pad.connect(duck);
      // kick -> Follower -> x(-amount) -> duck.gain: the louder the kick, the lower the pad.
      const follower = new Tone.Follower(0.1);
      const invert = new Tone.Multiply(-amount);
      const dc = new Tone.DCMeter();
      kick.chain(follower, invert);
      invert.connect(duck.gain);
      follower.connect(dc);
      live = { kick, pad, follower, invert, duck, dc };
      return live;
    },
    play: (g, time) => {
      g.invert.value = -amount;
      g.pad.triggerAttackRelease(['C4', 'E4', 'G4'], SECONDS - 0.1, time);
      for (let i = 0; i < 4; i++) g.kick.triggerAttackRelease('C1', 0.2, time + i * 0.5);
      const a = amount;
      stage.show(time, () => (shown = a));
    },
    stop: (g, time) => {
      g.pad.releaseAll(time);
    },
    dispose: (g) => {
      live = undefined;
      for (const n of [g.kick, g.pad, g.follower, g.invert, g.duck, g.dc]) n.dispose();
    },
    variants: [
      { label: 'ducking off', apply: () => (amount = 0) },
      { label: 'ducking on: kick pushes the pad down', apply: () => (amount = 3) },
    ],
    controls: (g, box) => {
      slider(box, 'duck amount', 0, 3.5, 0.1, 3, (v) => {
        amount = shown = v;
        g.invert.value = -v;
      });
    },
    frame: (time) => {
      const env = measured ? valueAt(measured, 0, time) : live ? live.dc.getValue() : 0;
      followBar.set(env / 0.4, env.toFixed(2));
      const gain = Math.max(0, 1 - shown * env);
      padBar.set(gain, `x${gain.toFixed(2)}`);
    },
  });
};

export default mount;
