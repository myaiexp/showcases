// observable-plot example: Rect: stacked countries by poverty rate
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect: stacked countries by poverty rate',
  summary:
    'Each country is a rect: stackX lays them along x by population in descending poverty rate, y2 holds the rate, so area is the number of people in poverty.',
  section: 'Mark: Rect',
  tags: ['rectY', 'stackX', 'order', 'reverse', 'y2', 'insetLeft', 'title'],
  docs: ['repo/docs/marks/rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
