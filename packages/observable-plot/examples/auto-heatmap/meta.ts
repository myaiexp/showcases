// observable-plot example: Auto: heatmap from a colour reducer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Auto: heatmap from a colour reducer',
  summary:
    'A reducer on color bins x and y and fills by count. Switching y from a number to a category changes the underlying marks without changing the call.',
  section: 'Mark: Auto',
  tags: ['auto', 'color', 'count'],
  docs: ['repo/docs/marks/auto.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
