// cosmos-gl example: Headless simulation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Headless simulation',
  summary:
    'Passing null instead of a div makes a Graph that only lays points out: no canvas, no input, no render loop. The page calls step() from its own frame loop, reads the positions back with getPointPositionsAsync() and paints them on an ordinary 2D canvas.',
  section: 'Headless & shared device',
  tags: ['new Graph(null, …)', 'step', 'getPointPositionsAsync', 'onSimulationEnd', 'render'],
  docs: [
    'repo/docs/host-embedding/README.md',
    'repo/src/stories/configuration.mdx',
    'repo/src/stories/api-reference.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
