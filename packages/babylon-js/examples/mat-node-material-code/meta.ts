// babylon-js example: Node material built in code
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Node material built in code',
  summary:
    'A NodeMaterial assembled from blocks: position, world and viewProjection InputBlocks through two TransformBlocks into a VertexOutputBlock, and two colour inputs mixed by a Lerp block into the FragmentOutputBlock, then build(). The mix input is found with getInputBlockByPredicate and changed every frame as a uniform.',
  section: 'Materials',
  tags: ['NodeMaterial', 'InputBlock', 'TransformBlock', 'LerpBlock', 'getInputBlockByPredicate'],
  docs: [
    'repo/content/features/featuresDeepDive/materials/node_material.md',
    'repo/content/features/featuresDeepDive/materials/node_material/nodeMaterial.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
