// observable-plot example: Area: random walk from numbers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: random walk from numbers',
  summary:
    'areaY given a plain array of numbers: x defaults to the index and y to the value. A seeded random walk, with a button for a new one.',
  section: 'Mark: Area',
  tags: ['areaY', 'd3.cumsum', 'randomNormal'],
  docs: ['repo/docs/marks/area.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
