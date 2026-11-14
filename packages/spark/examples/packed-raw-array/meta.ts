// Spark example: a PackedSplats built from a raw Uint32Array
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Building a raw packedArray',
  summary:
    'A double helix is written straight into a Uint32Array with utils.setPackedSplat, then each splat is turned along its strand with setPackedSplatQuat and shaped with setPackedSplatScales, and the array goes to new PackedSplats({ packedArray, numSplats }). The slider changes numSplats to draw only the first part of the array.',
  section: 'PackedSplats',
  tags: ['PackedSplats', 'packedArray', 'numSplats', 'setPackedSplat', 'setPackedSplatQuat', 'setPackedSplatScales'],
  docs: ['repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
