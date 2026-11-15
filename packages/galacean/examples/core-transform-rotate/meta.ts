// galacean example: Transform: rotate local or world
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: rotate local or world",
  summary:
    "Two tilted cubes both get rotate(0, 2, 0): with relativeToLocal the turn is around the cube's own tilted Y axis, without it around the world Y axis.",
  section: "Core",
  tags: ['Transform', 'rotate', 'relativeToLocal'],
  docs: [
    'repo/docs/en/core/transform.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
