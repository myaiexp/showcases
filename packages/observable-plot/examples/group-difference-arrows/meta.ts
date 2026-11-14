// observable-plot example: Group: male minus female arrows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: male minus female arrows',
  summary:
    'A link mark with groupX uses reducer functions to draw an arrow from the female to the male count per sport, coloured by which is larger.',
  section: 'Transform: Group',
  tags: ['link', 'groupX', 'reducer function', 'markerEnd'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
