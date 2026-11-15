// galacean example: Transform: lookAt
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: lookAt",
  summary:
    "A cone keeps its forward axis pointed at a sphere circling it with lookAt(target, worldUp). The full view lets you change the up vector.",
  section: "Core",
  tags: ['Transform', 'lookAt', 'worldUp'],
  docs: [
    'repo/docs/en/core/transform.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
