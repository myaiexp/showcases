// observable-plot example: Link: change in inequality
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link: change in inequality',
  summary:
    'Each US metro is a link from its 1980 population and inequality to its 2015 values, on a log x scale. Stroke encodes the change on a diverging scheme, markerEnd adds arrowheads and a text mark names the highlighted cities.',
  section: 'Mark: Link',
  tags: ['link', 'x1', 'y1', 'x2', 'y2', 'stroke', 'markerEnd', 'text', 'log scale'],
  docs: ['repo/docs/marks/link.md', 'repo/docs/data/metros.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
