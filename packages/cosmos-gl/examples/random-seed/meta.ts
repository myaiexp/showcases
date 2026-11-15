// cosmos-gl example: Random seed
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Random seed',
  summary:
    'The layout uses random numbers, so two runs normally differ. Give randomSeed a value when the graph is built and the same seed settles into the same positions every time, while another seed gives another layout. The point position read from the GPU shows it.',
  section: 'Configuration',
  tags: ['randomSeed', 'getPointPositions', 'simulationLinkDistRandomVariationRange'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx', 'repo/migration-notes.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
