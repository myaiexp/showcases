// observable-plot example: Area: vertical with areaX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: vertical with areaX',
  summary:
    'areaX puts time on y and the value on x, for a vertical area chart. Swap x and y from areaY.',
  section: 'Mark: Area',
  tags: ['areaX', 'line', 'ruleX'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
