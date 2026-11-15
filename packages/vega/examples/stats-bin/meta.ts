// vega example: Statistics: bin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Statistics: Bin Options',
  summary:
    'The vega.bin option sets (maxbins, nice, step, steps, minstep, divide, base) applied to one 300-value sample: the label shows the start, stop and step it returns and the histogram redraws to match.',
  section: 'Statistics',
  tags: ['statistics.bin'],
  docs: ['repo/docs/docs/api/statistics.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
