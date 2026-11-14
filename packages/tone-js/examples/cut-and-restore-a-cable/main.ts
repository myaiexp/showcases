// Cut a cable: disconnect(node) removes one connection, connect() puts it back
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { source, type Source } from '../../shared/fx-kit.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

interface Graph {
  src: Source;
  dry: Tone.Gain;
  echo: Tone.FeedbackDelay;
  on: { dry: boolean; echo: boolean };
}

const NODES = [
  { id: 'src', label: 'drums', x: 50, y: 60 },
  { id: 'dry', label: 'Gain', x: 200, y: 25 },
  { id: 'echo', label: 'FeedbackDelay', x: 200, y: 95, w: 96 },
  { id: 'out', label: 'speakers', x: 350, y: 60, w: 70 },
];
const EDGES = [
  { id: 'sd', from: 'src', to: 'dry' },
  { id: 'se', from: 'src', to: 'echo' },
  { id: 'do', from: 'dry', to: 'out' },
  { id: 'eo', from: 'echo', to: 'out' },
];

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2 });
  const pic = diagram(stage.visual, NODES, EDGES);

  const paint = (on: Graph['on']): void => {
    pic.setEdge('sd', on.dry);
    pic.setEdge('se', on.echo);
  };
  // Only the two cables out of the source are ever cut; the rest stay.
  const set = (g: Graph, path: 'dry' | 'echo', on: boolean): void => {
    g.on[path] = on;
    const target = path === 'dry' ? g.dry : g.echo;
    if (on) g.src.out.connect(target);
    else g.src.out.disconnect(target);
  };

  return stage.run({
    build: async (): Promise<Graph> => {
      const src = await source('drums');
      const dry = new Tone.Gain(1).toDestination();
      const echo = new Tone.FeedbackDelay(0.18, 0.55).toDestination();
      const g = { src, dry, echo, on: { dry: false, echo: false } };
      set(g, 'dry', true);
      set(g, 'echo', true);
      return g;
    },
    play: (g, time) => {
      g.src.start(time);
      const on = { ...g.on };
      stage.show(time, () => paint(on));
      for (let i = 0; i < 8; i++) stage.show(time + i * 0.25, () => pic.flash('src'));
    },
    stop: (g, time) => g.src.stop(time),
    variants: [
      { label: 'both cables', apply: () => undefined },
      { label: 'echo cable cut', apply: (g: Graph) => set(g, 'echo', false) },
      { label: 'dry cable cut', apply: (g: Graph) => set(g, 'dry', false) },
    ],
    controls: (g) => {
      // Click a cable in the picture to cut it or plug it back in, even mid-sound.
      pic.onEdge((id) => {
        const path = id === 'sd' ? 'dry' : id === 'se' ? 'echo' : null;
        if (path) {
          set(g, path, !g.on[path]);
          paint(g.on);
        }
      });
    },
  });
};

export default mount;
