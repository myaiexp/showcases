// cosmos-gl example: Link distance variation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link distance variation',
  summary:
    'simulationLinkDistRandomVariationRange gives each link a random multiplier on the link distance, drawn between its two numbers. [1, 1] makes a regular mesh, a wide range gives links of uneven length. Links are sent again to draw new multipliers.',
  section: 'Simulation forces',
  tags: ['simulationLinkDistRandomVariationRange', 'simulationLinkDistance', 'setLinks'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
