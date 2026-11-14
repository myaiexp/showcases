// Spark example: DynoPackedSplats with its packedSplats swapped at runtime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Swapping PackedSplats under a generator',
  summary:
    'One SplatGenerator reads splats through a single DynoPackedSplats with readPackedSplat. Assigning a different PackedSplats to its packedSplats property (a knot, a butterfly or a blob shell, each a different size) changes what is drawn on the next run, with no new program; updateMappingVersion() covers the new splat count. The package root doesn’t export the DynoPackedSplats constructor, so the instance is borrowed from PackedSplats.dyno.',
  section: 'Dyno Standard Library',
  tags: ['DynoPackedSplats', 'dynoPackedSplats', 'readPackedSplat', 'PackedSplats', 'SplatGenerator', 'updateMappingVersion'],
  docs: ['repo/docs/docs/packed-splats.md', 'repo/docs/docs/dyno-stdlib.md', 'repo/docs/docs/system-design.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
