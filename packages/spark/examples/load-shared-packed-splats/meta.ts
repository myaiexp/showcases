// Spark example: several SplatMesh instances reading one shared PackedSplats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One PackedSplats, many SplatMeshes',
  summary:
    'A torus knot is built once into a PackedSplats and then wrapped by a ring of SplatMesh clones through the packedSplats option, each with a different position, scale, spin and recolor tint. The label counts the shared 16-byte splats against what the clones draw; the slider changes how many clones are visible.',
  section: 'Loading Splats',
  tags: ['PackedSplats', 'SplatMesh', 'packedSplats', 'recolor'],
  docs: ['repo/docs/docs/loading-splats.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
