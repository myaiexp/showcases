// Split the ears: send only one channel through a filter, then Merge them back
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { stereoSource, type StereoSource } from '../../shared/stereo-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Ear = 'none' | 'left' | 'right';
interface Graph {
  src: StereoSource;
  split: Tone.Split;
  filter: Tone.Filter;
  merge: Tone.Merge;
}

const NODES = [
  { id: 'src', label: 'stereo', x: 36, y: 60, w: 52 },
  { id: 'sL', label: 'Split 0', x: 120, y: 24, w: 56 },
  { id: 'sR', label: 'Split 1', x: 120, y: 96, w: 56 },
  { id: 'filter', label: 'lowpass', x: 232, y: 60, w: 60 },
  { id: 'mL', label: 'Merge L', x: 340, y: 24, w: 60 },
  { id: 'mR', label: 'Merge R', x: 340, y: 96, w: 60 },
];
const EDGES = [
  { id: 'a', from: 'src', to: 'sL' },
  { id: 'b', from: 'src', to: 'sR' },
  { id: 'dL', from: 'sL', to: 'mL' },
  { id: 'dR', from: 'sR', to: 'mR' },
  { id: 'fL', from: 'sL', to: 'filter', off: true },
  { id: 'fR', from: 'sR', to: 'filter', off: true },
  { id: 'oL', from: 'filter', to: 'mL', off: true },
  { id: 'oR', from: 'filter', to: 'mR', off: true },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, channels: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);

  let current: Ear = 'none';
  const paint = (ear: Ear): void => {
    for (const side of ['L', 'R']) {
      const treated = (ear === 'left') === (side === 'L') && ear !== 'none';
      pic.setEdge(`d${side}`, !treated);
      pic.setEdge(`f${side}`, treated);
      pic.setEdge(`o${side}`, treated);
    }
  };
  // The channel under treatment goes through the filter; the other goes straight across.
  const wire = (g: Graph, ear: Ear): void => {
    current = ear;
    g.split.disconnect();
    g.filter.disconnect();
    ([0, 1] as const).forEach((ch) => {
      const treated = (ear === 'left' && ch === 0) || (ear === 'right' && ch === 1);
      if (treated) {
        g.split.connect(g.filter, ch, 0);
        g.filter.connect(g.merge, 0, ch);
      } else {
        g.split.connect(g.merge, ch, ch);
      }
    });
  };

  return stage.run({
    build: (): Graph => {
      const src = stereoSource(true);
      const split = new Tone.Split(2);
      const filter = new Tone.Filter(250, 'lowpass', -24);
      const merge = new Tone.Merge(2).toDestination();
      src.out.connect(split);
      const g = { src, split, filter, merge };
      wire(g, 'none');
      return g;
    },
    play: (g, time) => {
      g.src.start(time, 2);
      const ear = current;
      stage.show(time, () => paint(ear));
    },
    stop: (g, time) => g.src.stop(time),
    variants: [
      { label: 'both ears untouched', apply: (g: Graph) => wire(g, 'none') },
      { label: 'only the right ear muffled', apply: (g: Graph) => wire(g, 'right') },
      { label: 'only the left ear muffled', apply: (g: Graph) => wire(g, 'left') },
    ],
    controls: (g, bar) => {
      select(bar, 'muffle', ['none', 'left', 'right'] as const, (e) => {
        wire(g, e);
        paint(e);
      });
    },
  });
};

export default mount;
