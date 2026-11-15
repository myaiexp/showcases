// cosmos-gl example: Link spring
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link spring',
  summary:
    'simulationLinkSpring sets how hard each link pulls its two points toward the link distance. A mesh stays square and tight at a high value and sags and tears apart at a low one.',
  section: 'Simulation forces',
  tags: ['simulationLinkSpring', 'setConfigPartial', 'start'],
  docs: ['repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
