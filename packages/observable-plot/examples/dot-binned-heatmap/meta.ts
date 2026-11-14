// observable-plot example: Dot: binned heatmap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dot: binned heatmap',
  summary:
    'Diamonds binned by carat and price, drawn as dots whose radius counts the diamonds in the bin. The thresholds option sets how fine the bins are.',
  section: 'Mark: Dot',
  tags: ['dot', 'bin', 'r', 'thresholds'],
  docs: ['repo/docs/marks/dot.md', 'repo/docs/transforms/bin.md', 'repo/docs/data/diamonds.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
