// d2 example: Globs: scoped to their container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Globs: scoped to their container',
  summary:
    'A glob applies only at the level where it is written. The `*.shape: circle` inside `pizzas` makes pizzas circles and the one in `humans` makes people; neither touches the other group.',
  section: 'Globs',
  tags: ['globs', 'scope', 'container'],
  docs: ['repo/docs/tour/globs.md', 'repo/static/d2/globs-scope.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});
