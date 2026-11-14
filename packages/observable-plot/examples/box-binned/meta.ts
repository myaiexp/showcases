// observable-plot example: Box: binned carats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Box: binned carats',
  summary:
    'Boxplots of diamond price by carat, binned two ways: with Math.floor on a computed x, or with the interval option on the fx scale.',
  section: 'Mark: Box',
  tags: ['boxY', 'fx', 'interval', 'tickFormat'],
  docs: ['repo/docs/marks/box.md', 'repo/docs/data/diamonds.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
