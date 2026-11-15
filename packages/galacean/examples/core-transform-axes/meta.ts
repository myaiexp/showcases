// galacean example: Transform: worldForward, worldRight, worldUp
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Transform: worldForward, worldRight, worldUp",
  summary:
    "A turning cube with its three world-space direction vectors drawn as arrows. Forward is -Z in this right-handed engine.",
  section: "Core",
  tags: ['Transform', 'worldForward', 'worldRight', 'worldUp'],
  docs: [
    'repo/docs/en/core/transform.mdx',
    'repo/docs/en/core/space.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
