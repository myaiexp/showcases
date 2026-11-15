// galacean example: Transform: local and world values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: local and world values",
  summary:
    "A child inside a moved, turned and scaled parent: position is local, worldPosition is where it lands, and lossyWorldScale is the combined scale. Setting worldPosition places the child anywhere in the world.",
  section: "Core",
  tags: ['Transform', 'worldPosition', 'position', 'lossyWorldScale', 'worldRotation'],
  docs: [
    'repo/docs/en/core/transform.mdx',
    'repo/docs/en/core/space.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
