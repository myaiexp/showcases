// galacean example: Math: Vector3
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Math: Vector3",
  summary:
    "Vector3 arithmetic drawn as arrows: static add(v1, v2, out) leaves its inputs alone, the instance v1.add(v2) changes v1, length() measures and normalize() gives the unit vector.",
  section: "Core",
  tags: ['Vector3', 'add', 'length', 'normalize', 'clone', 'cloneTo'],
  docs: [
    'repo/docs/en/core/math.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
