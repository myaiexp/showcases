// galacean example: Transform: translate local or world
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: translate local or world",
  summary:
    "Two cubes turned 45 degrees step forward by the same vector: translate(v, true) walks along each cube's own axes, translate(v, false) along the world's.",
  section: "Core",
  tags: ['Transform', 'translate', 'relativeToLocal'],
  docs: [
    'repo/docs/en/core/transform.mdx',
    'repo/docs/en/core/space.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
