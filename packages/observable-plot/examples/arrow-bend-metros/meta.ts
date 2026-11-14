// observable-plot example: Arrow: bend on metro inequality
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Arrow: bend on metro inequality',
  summary:
    'Arrows from each US metro in 1980 to 2015, coloured by change in inequality. The bend option curves them; a slider sets the angle.',
  section: 'Mark: Arrow',
  tags: ['arrow', 'bend', 'text', 'filter'],
  docs: ['repo/docs/marks/arrow.md', 'repo/docs/data/metros.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
