// observable-plot example: Curves: overlay and compare
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Curves: overlay and compare',
  summary:
    'Five curves drawn over the same Apple closing prices, with toggles; the dots mark the real values each curve passes through or near.',
  section: 'Curves',
  tags: ['line', 'dot', 'curve', 'monotone-x', 'natural'],
  docs: ['repo/docs/features/curves.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
