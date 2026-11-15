// galacean example: Camera priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera priority",
  summary:
    "Two cameras with overlapping viewports look at the same cube from different sides. The camera with the higher priority renders later and covers the overlap; swapping the priority values swaps which view is on top.",
  section: "Camera",
  tags: ['Camera', 'priority', 'viewport'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/camera/multiCamera.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
