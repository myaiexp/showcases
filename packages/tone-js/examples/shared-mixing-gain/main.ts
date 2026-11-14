// Mixing point: a Gain per part, then one shared Gain into a single echo
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { band, PARTS, type Band } from '../../shared/band-kit.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  band: Band;
  faders: Tone.Gain[];
  mix: Tone.Gain;
  echo: Tone.FeedbackDelay;
}

const NODES = [
  { id: 'p0', label: 'bass', x: 40, y: 22, w: 56 },
  { id: 'p1', label: 'keys', x: 40, y: 60, w: 56 },
  { id: 'p2', label: 'lead', x: 40, y: 98, w: 56 },
  { id: 'mix', label: 'mix Gain', x: 165, y: 60, w: 72 },
  { id: 'echo', label: 'one echo', x: 265, y: 60, w: 70 },
  { id: 'out', label: 'speakers', x: 357, y: 60, w: 64 },
];
const EDGES = [
  { id: 'e0', from: 'p0', to: 'mix' },
  { id: 'e1', from: 'p1', to: 'mix' },
  { id: 'e2', from: 'p2', to: 'mix' },
  { id: 'm', from: 'mix', to: 'echo' },
  { id: 'o', from: 'echo', to: 'out' },
];
const MIXES: { label: string; levels: number[] }[] = [
  { label: 'bass only', levels: [1, 0, 0] },
  { label: 'bass + keys', levels: [1, 1, 0] },
  { label: 'all three through one echo', levels: [1, 1, 1] },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);
  let current = [1, 1, 1];
  const paint = (v: number[]): void => v.forEach((x, i) => pic.setEdge(`e${i}`, x > 0));
  const levels = (g: Graph, v: number[]): void => {
    current = v;
    v.forEach((x, i) => (g.faders[i]!.gain.value = x));
  };

  return stage.run({
    build: (): Graph => {
      const b = band();
      const echo = new Tone.FeedbackDelay(0.25, 0.4).toDestination();
      echo.wet.value = 0.4;
      const mix = new Tone.Gain(1).connect(echo);
      // Each part gets its own fader Gain, and every fader feeds the same mix Gain.
      const faders = b.parts.map((p) => {
        const f = new Tone.Gain(1).connect(mix);
        p.connect(f);
        return f;
      });
      const g = { band: b, faders, mix, echo };
      return g;
    },
    play: (g, time) => {
      const v = current;
      stage.show(time, () => paint(v));
      g.band.start(time, 2, (part, at) => v[part]! > 0 && stage.show(at, () => pic.flash(`p${part}`)));
    },
    stop: (g, time) => g.band.stop(time),
    dispose: (g) => {
      g.band.dispose();
      g.faders.forEach((f) => f.dispose());
      g.mix.dispose();
      g.echo.dispose();
    },
    variants: MIXES.map((m) => ({ label: m.label, apply: (g: Graph) => levels(g, m.levels) })),
    controls: (g, bar) => {
      PARTS.forEach((name, i) =>
        slider(bar, name, 0, 1, 0.01, 1, (v) => {
          levels(g, current.map((x, j) => (j === i ? v : x)));
          paint(current);
        }),
      );
      slider(bar, 'echo', 0, 1, 0.01, 0.4, (v) => (g.echo.wet.value = v));
    },
  });
};

export default mount;
