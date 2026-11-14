// observable-plot example: Area: overlapping with y2
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: overlapping with y2',
  summary:
    'Setting y2 instead of y turns off the implicit stack, so series overlap; z groups the rows and a line traces each one.',
  section: 'Mark: Area',
  tags: ['areaY', 'y2', 'z', 'lineY'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
