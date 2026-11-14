// Spark example: a SplatGenerator that maps index to Gsplat in a dyno block
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A SplatGenerator with no splat data',
  summary:
    'A SplatGenerator whose dyno block turns each splat’s integer index and a time uniform into a position, colour and size, so a wobbling rainbow torus exists only as GPU code with no PackedSplats behind it. A SplatTransformer lets the object’s own rotation apply; the slider changes numSplats and calls updateMappingVersion().',
  section: 'Dyno Overview',
  tags: ['SplatGenerator', 'dyno.dynoBlock', 'combineGsplat', 'dynoFloat', 'SplatTransformer', 'updateMappingVersion'],
  docs: ['repo/docs/docs/dyno-overview.md', 'repo/docs/docs/system-design.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
