// observable-plot example: Grid: explicit grid above bars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Grid: explicit grid above bars',
  summary:
    'An explicit gridX with interval: 1 drawn after the bars, so the lines show on top of them. The toggle swaps it for the default grid below the bars.',
  section: 'Mark: Grid',
  tags: ['gridX', 'interval', 'barX', 'stroke', 'strokeOpacity'],
  docs: ['repo/docs/marks/grid.md', 'repo/docs/data/alphabet.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
