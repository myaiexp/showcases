// cosmos-gl example: Link strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Link strength',
  summary:
    'setLinkStrength gives each link its own pull. Three communities are joined by a few bridge links (drawn in orange): weak bridges let the groups drift apart, strong ones hold them together, and equal strength treats every link alike.',
  section: 'Simulation forces',
  tags: ['setLinkStrength', 'setLinkColors', 'setLinks'],
  docs: ['repo/src/stories/api-reference.mdx', 'repo/src/stories/configuration.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});
