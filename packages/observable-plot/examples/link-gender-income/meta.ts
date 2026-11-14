// observable-plot example: Link: diagonal reference lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link: diagonal reference lines',
  summary:
    'Five links from the origin mark parity and gaps of 10 to 40 percent between men and women median income, with a dot for each education and age group. Unlike a rule, a link can run along any slope.',
  section: 'Mark: Link',
  tags: ['link', 'x1', 'y1', 'x2', 'y2', 'dot', 'text', 'aspectRatio', 'transform'],
  docs: ['repo/docs/marks/link.md', 'repo/docs/data/income-gender.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
