// observable-plot example: Box: vertical and horizontal
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Box: vertical and horizontal',
  summary:
    'boxY and boxX summarize the Michelson speed-of-light runs per experiment as a rule, an interquartile bar, a median tick and outlier dots; swap x and y to turn it.',
  section: 'Mark: Box',
  tags: ['boxX', 'boxY'],
  docs: ['repo/docs/marks/box.md', 'repo/docs/data/morley.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
