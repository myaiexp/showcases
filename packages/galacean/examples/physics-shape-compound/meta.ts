// galacean example: Compound shape: two boxes in one collider
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Compound shape: two boxes in one collider",
  summary:
    "A T-shaped body made of a wide box and a narrow box added to one DynamicCollider with addShape, the second offset 1 unit up. It tumbles as one rigid piece; the outlines show both shapes.",
  section: "Physics",
  tags: ['Collider.addShape', 'ColliderShape.position', 'DynamicCollider'],
  docs: [
    'repo/docs/en/physics/collider/colliderShape.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
