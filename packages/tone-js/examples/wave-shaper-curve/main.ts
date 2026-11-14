// WaveShaper: an input-to-output curve bends a growing sine
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { plot } from '../../shared/curve-plot.ts';
import { toneStage } from '../../shared/stage.ts';
import { bigLabel } from '../../shared/widgets.ts';

const SECONDS = 3;
const SHAPES = {
  straight: { text: 'x => x', fn: (x: number) => x },
  'hard clip': { text: 'x => clamp(x * 3, -0.5, 0.5)', fn: (x: number) => Math.max(-0.5, Math.min(0.5, x * 3)) },
  fold: { text: 'x => sin(x * 6)', fn: (x: number) => Math.sin(x * 6) },
  steps: { text: 'x => round(x * 4) / 4', fn: (x: number) => Math.round(x * 4) / 4 },
} as const;
type Name = keyof typeof SHAPES;
const NAMES = Object.keys(SHAPES) as Name[];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: SECONDS });
  const label = bigLabel(stage.visual, SHAPES.straight.text);
  if (stage.preview) label.style.fontSize = '14px';
  const curve = plot(stage, { yMin: -1.2, yMax: 1.2, guides: [0], corner: { top: 'output', bottom: 'input -1 to 1' } });
  let name: Name = 'straight';
  let loud = 0;

  return stage.run({
    build: () => {
      const shaper = new Tone.WaveShaper(SHAPES.straight.fn);
      const out = new Tone.Gain(0.4).toDestination();
      shaper.connect(out);
      // The input sine grows from silence to full level, so it reaches further along the curve.
      const swell = new Tone.Gain(0).connect(shaper);
      const osc = new Tone.Oscillator({ type: 'sine', frequency: 140 }).connect(swell);
      return { shaper, out, swell, osc };
    },
    play: (g, time) => {
      g.shaper.setMap(SHAPES[name].fn);
      g.swell.gain.cancelScheduledValues(time);
      g.swell.gain.setValueAtTime(0, time);
      g.swell.gain.linearRampToValueAtTime(1, time + SECONDS - 0.1);
      g.osc.start(time).stop(time + SECONDS);
      // Read the curve now: the card disposes the shaper before its cue runs.
      const y = Array.from(g.shaper.curve ?? []);
      const n = name;
      stage.show(time, () => {
        label.textContent = SHAPES[n].text;
        curve.set([{ y }]);
        loud = 0;
      });
    },
    variants: NAMES.map((n) => ({
      label: n,
      apply: () => {
        name = n;
      },
    })),
    controls: (_, bar) => select<Name>(bar, 'curve', NAMES, (v) => (name = v)),
    // The dot sits where the loudest part of the input is right now.
    frame: (t) => {
      loud = Math.min(1, t / (SECONDS - 0.1));
      curve.render(0.5 + loud / 2);
    },
  });
};

export default mount;
