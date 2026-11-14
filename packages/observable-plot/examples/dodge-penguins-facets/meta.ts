// observable-plot example: Dodge: penguin facets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Dodge: penguin facets',
  summary:
    'dodgeX with the middle anchor builds a beeswarm of body mass per species facet (fx), coloured by sex.',
  section: 'Transform: Dodge',
  tags: ['dot', 'dodgeX', 'fx', 'fill', 'anchor'],
  docs: ['repo/docs/transforms/dodge.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
