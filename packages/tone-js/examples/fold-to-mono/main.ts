// Mono: stereo in, the same summed signal out of both ears
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { stereoSource, type StereoSource } from '../../shared/stereo-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  src: StereoSource;
  mono: Tone.Mono;
}

const NODES = [
  { id: 'src', label: 'stereo: L differs from R', x: 84, y: 60, w: 152 },
  { id: 'mono', label: 'Mono', x: 220, y: 24, w: 52 },
  { id: 'out', label: 'speakers', x: 350, y: 60, w: 70 },
];
const EDGES = [
  { id: 'direct', from: 'src', to: 'out' },
  { id: 'a', from: 'src', to: 'mono', off: true },
  { id: 'b', from: 'mono', to: 'out', off: true },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, channels: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);
  let folded = false;
  const paint = (m: boolean): void => {
    pic.setEdge('direct', !m);
    pic.setEdge('a', m);
    pic.setEdge('b', m);
  };
  const wire = (g: Graph, m: boolean): void => {
    folded = m;
    g.src.out.disconnect();
    if (m) g.src.out.connect(g.mono);
    else g.src.out.toDestination();
  };

  return stage.run({
    build: (): Graph => {
      const src = stereoSource(true);
      const mono = new Tone.Mono().toDestination();
      const g = { src, mono };
      wire(g, false);
      return g;
    },
    play: (g, time) => {
      const m = folded;
      stage.show(time, () => paint(m));
      g.src.start(time, 2);
    },
    stop: (g, time) => g.src.stop(time),
    variants: [
      { label: 'stereo: the traces differ', apply: (g: Graph) => wire(g, false) },
      { label: 'through Mono: the traces match', apply: (g: Graph) => wire(g, true) },
    ],
    controls: (g, bar) => {
      checkbox(bar, 'fold to mono', false, (m) => {
        wire(g, m);
        paint(m);
      });
    },
  });
};

export default mount;
