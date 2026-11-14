// Fuse.js example: the docs' benchmark script, run in this browser with its log shown
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Is it fast enough on this device?',
  summary:
    'The Performance page\'s answer to "is Fuse.js fast enough for me?" is to measure it. This is its benchmark script running right here: it makes a list of random documents, times building the index, and averages a search over many runs.',
  section: 'Performance',
  tags: ['new Fuse', 'search', 'threshold', 'keys', 'benchmark', 'performance'],
  docs: ['repo/docs/performance.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
