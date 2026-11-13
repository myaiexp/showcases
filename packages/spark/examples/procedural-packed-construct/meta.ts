// Spark example: PackedSplats construct callback building a double helix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural PackedSplats construct',
  summary:
    'A double helix of splats created by new PackedSplats({ construct }), whose callback pushes every splat, and then handed to a SplatMesh through packedSplats. Sliders change the number of turns and splats per strand; each change builds a new PackedSplats.',
  section: 'Procedural Splats',
  tags: ['PackedSplats', 'construct', 'pushSplat', 'SplatMesh', 'packedSplats'],
  docs: ['repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
