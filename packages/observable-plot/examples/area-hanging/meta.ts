// observable-plot example: Area: hanging baseline
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: hanging baseline',
  summary:
    'Reversing the y scale makes the area hang down from y = 0 instead of growing up.',
  section: 'Mark: Area',
  tags: ['areaY', 'reverse', 'line'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
