// observable-plot example: Normalize: stock index chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normalize: stock index chart',
  summary:
    'normalizeY divides each stock by its first close, so every line starts at 1. A text mark with selectLast labels the line ends, and a toggle switches the log scale.',
  section: 'Transform: Normalize',
  tags: ['line', 'text', 'normalizeY', 'selectLast', 'log'],
  docs: ['repo/docs/transforms/normalize.md', 'repo/docs/transforms/select.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
