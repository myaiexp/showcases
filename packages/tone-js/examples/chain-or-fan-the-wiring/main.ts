// Chain or fan: the same source and two effects wired in a line or side by side
import * as Tone from 'tone';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { source, type Source } from '../../shared/fx-kit.ts';
import { diagram } from '../../shared/routing-kit.ts';
import { toneStage } from '../../shared/stage.ts';

type Mode = 'chain' | 'fan';
interface Graph {
  src: Source;
  filter: Tone.Filter;
  delay: Tone.FeedbackDelay;
}

const NODES = [
  { id: 'src', label: 'riff', x: 45, y: 60 },
  { id: 'filter', label: 'Filter', x: 150, y: 28 },
  { id: 'delay', label: 'Delay', x: 250, y: 92 },
  { id: 'out', label: 'speakers', x: 350, y: 60, w: 70 },
];
const EDGES = [
  { id: 'sf', from: 'src', to: 'filter' },
  { id: 'fd', from: 'filter', to: 'delay' },
  { id: 'sd', from: 'src', to: 'delay' },
  { id: 'fo', from: 'filter', to: 'out' },
  { id: 'do', from: 'delay', to: 'out' },
];
const ON: Record<Mode, string[]> = { chain: ['sf', 'fd', 'do'], fan: ['sf', 'sd', 'fo', 'do'] };

const mount: Mount = (el, ctx) => {
  const stage = toneStage(el, ctx, { seconds: 2.5 });
  const pic = diagram(stage.visual, NODES, EDGES);
  let mode: Mode = 'chain';

  const paint = (m: Mode): void => {
    for (const e of EDGES) pic.setEdge(e.id, ON[m].includes(e.id));
  };
  // Remove every cable, then lay the new ones: chain() runs a line, fan() splits it.
  const wire = (g: Graph, m: Mode): void => {
    mode = m;
    g.src.out.disconnect();
    g.filter.disconnect();
    g.delay.disconnect();
    if (m === 'chain') g.src.out.chain(g.filter, g.delay, Tone.getDestination());
    else {
      g.src.out.fan(g.filter, g.delay);
      g.filter.toDestination();
      g.delay.toDestination();
    }
  };

  return stage.run({
    build: async (): Promise<Graph> => {
      const g = { src: await source('riff'), filter: new Tone.Filter(500, 'lowpass'), delay: new Tone.FeedbackDelay(0.125, 0.45) };
      wire(g, 'chain');
      return g;
    },
    play: (g, time) => {
      g.src.start(time);
      const m = mode;
      stage.show(time, () => paint(m));
      for (let i = 0; i < 8; i++) {
        stage.show(time + i * 0.25, () => (['src', 'filter', 'delay'] as const).forEach((id) => pic.flash(id)));
      }
    },
    stop: (g, time) => g.src.stop(time),
    variants: (['chain', 'fan'] as const).map((m) => ({ label: m === 'chain' ? 'chain: in a line' : 'fan: side by side', apply: (g: Graph) => wire(g, m) })),
    controls: (g, bar) => {
      select(bar, 'wiring', ['chain', 'fan'] as const, (m) => {
        wire(g, m);
        paint(m);
      }, mode);
    },
  });
};

export default mount;
