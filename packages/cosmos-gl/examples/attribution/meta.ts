// cosmos-gl example: Attribution
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Attribution',
  summary:
    'The attribution option puts a line of HTML in the bottom right corner, and an empty string hides it. It is only read when the graph is built; its color is the CSS variable --cosmosgl-attribution-color, which can change at any time.',
  section: 'Configuration',
  tags: ['attribution', '--cosmosgl-attribution-color'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/migration-notes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
