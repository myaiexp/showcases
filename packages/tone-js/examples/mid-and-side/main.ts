// Mid/side: MidSideSplit takes out the shared centre and the difference
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { stereoSource, type StereoSource } from '../../shared/stereo-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  src: StereoSource;
  split: Tone.MidSideSplit;
  mid: Tone.Gain;
  side: Tone.Gain;
  merge: Tone.MidSideMerge;
}

const NODES = [
  { id: 'src', label: 'stereo', x: 34, y: 60, w: 50 },
  { id: 'split', label: 'MS Split', x: 110, y: 60, w: 64 },
  { id: 'mid', label: 'mid x1', x: 210, y: 26, w: 64 },
  { id: 'side', label: 'side x1', x: 210, y: 94, w: 64 },
  { id: 'merge', label: 'MS Merge', x: 305, y: 60, w: 70 },
  { id: 'out', label: 'out', x: 375, y: 60, w: 34 },
];
const EDGES = [
  { id: 'a', from: 'src', to: 'split' },
  { id: 'm1', from: 'split', to: 'mid' },
  { id: 's1', from: 'split', to: 'side' },
  { id: 'm2', from: 'mid', to: 'merge' },
  { id: 's2', from: 'side', to: 'merge' },
  { id: 'o', from: 'merge', to: 'out' },
];
const MIXES = [
  { label: 'both as played', mid: 1, side: 1 },
  { label: 'mid only: the shared centre', mid: 1, side: 0 },
  { label: 'side only: what differs', mid: 0, side: 1 },
  { label: 'side x2: wider', mid: 1, side: 2 },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2, channels: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);
  let mix = { mid: 1, side: 1 };
  const paint = (m: { mid: number; side: number }): void => {
    pic.setLabel('mid', `mid x${m.mid}`);
    pic.setLabel('side', `side x${m.side}`);
    pic.setEdge('m2', m.mid > 0);
    pic.setEdge('s2', m.side > 0);
  };

  return stage.run({
    build: (): Graph => {
      const src = stereoSource(true);
      const split = new Tone.MidSideSplit();
      const mid = new Tone.Gain(1);
      const side = new Tone.Gain(1);
      const merge = new Tone.MidSideMerge().toDestination();
      src.out.connect(split);
      // split.mid and split.side are the two outputs; merge.mid and merge.side the two inputs.
      split.mid.chain(mid, merge.mid);
      split.side.chain(side, merge.side);
      return { src, split, mid, side, merge };
    },
    play: (g, time) => {
      g.mid.gain.value = mix.mid;
      g.side.gain.value = mix.side;
      const m = { ...mix };
      stage.show(time, () => paint(m));
      g.src.start(time, 2);
    },
    stop: (g, time) => g.src.stop(time),
    variants: MIXES.map(({ label, ...m }) => ({
      label,
      apply: () => {
        mix = { ...m };
      },
    })),
    controls: (g, bar) => {
      slider(bar, 'mid', 0, 2, 0.05, 1, (v) => { mix.mid = v; g.mid.gain.value = v; paint(mix); });
      slider(bar, 'side', 0, 2, 0.05, 1, (v) => { mix.side = v; g.side.gain.value = v; paint(mix); });
    },
  });
};

export default mount;
