// observable-plot example: Select: choose by a colour channel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select: choose by a colour channel',
  summary:
    'The select object form names any channel: here fill carries trade volume, and max or min keeps the busiest or quietest day of each stock.',
  section: 'Transform: Select',
  tags: ['dot', 'select', 'fill', 'max', 'min'],
  docs: ['repo/docs/transforms/select.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
