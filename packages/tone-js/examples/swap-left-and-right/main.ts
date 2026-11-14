// Swap ears: split.connect(merge, 0, 1) sends left into the right input
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { stereoSource, type StereoSource } from '../../shared/stereo-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  src: StereoSource;
  split: Tone.Split;
  merge: Tone.Merge;
}

const NODES = [
  { id: 'L', label: 'left: triangle', x: 62, y: 28, w: 100 },
  { id: 'R', label: 'right: saw', x: 62, y: 92, w: 100 },
  { id: 'sL', label: 'Split 0', x: 200, y: 28, w: 56 },
  { id: 'sR', label: 'Split 1', x: 200, y: 92, w: 56 },
  { id: 'mL', label: 'Merge L', x: 322, y: 28, w: 60 },
  { id: 'mR', label: 'Merge R', x: 322, y: 92, w: 60 },
];
const EDGES = [
  { id: 'a', from: 'L', to: 'sL' },
  { id: 'b', from: 'R', to: 'sR' },
  { id: 'straightL', from: 'sL', to: 'mL' },
  { id: 'straightR', from: 'sR', to: 'mR' },
  { id: 'swapL', from: 'sL', to: 'mR', off: true },
  { id: 'swapR', from: 'sR', to: 'mL', off: true },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, channels: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);

  let swap = false;
  const paint = (swapped: boolean): void => {
    pic.setEdge('straightL', !swapped);
    pic.setEdge('straightR', !swapped);
    pic.setEdge('swapL', swapped);
    pic.setEdge('swapR', swapped);
  };
  const wire = (g: Graph, swapped: boolean): void => {
    swap = swapped;
    g.split.disconnect();
    // connect(destination, outputNumber, inputNumber)
    g.split.connect(g.merge, 0, swapped ? 1 : 0);
    g.split.connect(g.merge, 1, swapped ? 0 : 1);
  };

  return stage.run({
    build: (): Graph => {
      const src = stereoSource(false);
      const split = new Tone.Split(2);
      const merge = new Tone.Merge(2).toDestination();
      src.out.connect(split);
      const g = { src, split, merge };
      wire(g, false);
      return g;
    },
    play: (g, time) => {
      const swapped = swap;
      stage.show(time, () => paint(swapped));
      g.src.start(time, 2, (side, at) => stage.show(at, () => pic.flash(side === 'L' ? 'L' : 'R', side === 'L' ? '#7aa2ff' : '#ff8fb1')));
    },
    stop: (g, time) => g.src.stop(time),
    variants: [
      { label: 'as played: blue left, pink right', apply: (g: Graph) => wire(g, false) },
      { label: 'swapped: blue now right', apply: (g: Graph) => wire(g, true) },
    ],
    controls: (g, bar) => {
      checkbox(bar, 'swap left and right', false, (v) => {
        wire(g, v);
        paint(v);
      });
    },
  });
};

export default mount;
