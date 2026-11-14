// observable-plot example: Bar: grouped unit chart with fy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bar: grouped unit chart with fy',
  summary:
    'A grouped bar chart through faceting: one unit bar per penguin, counted by sex along y and partitioned by island with fy.',
  section: 'Mark: Bar',
  tags: ['barX', 'fy', 'inset', 'padding'],
  docs: ['repo/docs/marks/bar.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
