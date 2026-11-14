// CrossFade: fade 0 is all of input a, 1 all of input b, equal power
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { BLUE, PINK, bar, column, strip } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

const SECONDS = 2;
const A = ['C3', 'E3', 'G3', 'E3'];
const B = ['G5', 'E5', 'C5', 'E5'];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const col = column(stage.visual);
  const dot = strip(col, 'a', 'b');
  const barA = bar(col, 'a', BLUE);
  const barB = bar(col, 'b', PINK);
  let sweep = true;
  let fixed = 0.5;
  // What the current pass does (a card shows one variant after another).
  let shown: number | null = null;
  const paint = (f: number): void => {
    dot.set(f);
    // Equal power: the two gains follow a quarter cosine and sine.
    const a = Math.cos((f * Math.PI) / 2);
    const b = Math.sin((f * Math.PI) / 2);
    barA.set(a, `x${a.toFixed(2)}`);
    barB.set(b, `x${b.toFixed(2)}`);
  };

  return stage.run({
    build: () => {
      const cf = new Tone.CrossFade(0).toDestination();
      const a = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.1 }, volume: -12 }).connect(cf.a);
      const b = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 0.1 }, volume: -8 }).connect(cf.b);
      return { cf, a, b };
    },
    play: (g, time) => {
      g.cf.fade.cancelScheduledValues(time);
      if (sweep) {
        g.cf.fade.setValueAtTime(0, time);
        g.cf.fade.linearRampToValueAtTime(1, time + SECONDS);
      } else {
        g.cf.fade.setValueAtTime(fixed, time);
      }
      for (let i = 0; i < 8; i++) {
        g.a.triggerAttackRelease(A[i % 4]!, 0.2, time + i * 0.25);
        g.b.triggerAttackRelease(B[i % 4]!, 0.2, time + i * 0.25 + 0.125);
      }
      const v = sweep ? null : fixed;
      stage.show(time, () => {
        shown = v;
        if (v !== null) paint(v);
      });
    },
    stop: (g, time) => {
      g.a.triggerRelease(time);
      g.b.triggerRelease(time);
    },
    variants: [
      { label: 'fade sweeps 0 to 1: a into b', apply: () => (sweep = true) },
      { label: 'fade 0.5: both at equal power', apply: () => { sweep = false; fixed = 0.5; } },
    ],
    controls: (g, box) => {
      const slide = slider(box, 'fade', 0, 1, 0.01, 0.5, (v) => {
        fixed = v;
        if (!sweep) {
          g.cf.fade.cancelScheduledValues(0);
          g.cf.fade.value = v;
          shown = v;
          paint(v);
        }
      });
      checkbox(box, 'sweep a to b each pass', true, (on) => {
        sweep = on;
        if (!on) {
          g.cf.fade.cancelScheduledValues(0);
          g.cf.fade.value = Number(slide.value);
          fixed = Number(slide.value);
          shown = fixed;
          paint(fixed);
        }
      });
    },
    frame: (time) => {
      if (shown === null) paint(Math.min(1, time / SECONDS));
    },
  });
};

export default mount;
