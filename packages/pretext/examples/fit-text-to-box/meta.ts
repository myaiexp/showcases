// Pretext example: largest font size whose laid-out height fits a box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fit text to a box',
  summary:
    'A different font size is a different prepare(), so the search prepares each candidate size once and asks layout() for its height. The largest whole-pixel size that fits the box wins; the box resizes live.',
  section: 'Manual line layout',
  tags: ['layout', 'prepare', 'font size', 'fit'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
