// observable-plot example: Defaults, then refinements
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Defaults, then refinements',
  summary:
    'From Why Plot?: a one-line penguin scatterplot where Plot picks every default, next to the same plot refined with a grid, aspectRatio 1, inset, tickSpacing, axis labels, a frame and a colour legend.',
  section: 'Introduction',
  tags: ['defaults', 'grid', 'aspectRatio', 'inset', 'tickSpacing', 'frame', 'legend'],
  docs: ['repo/docs/why-plot.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
