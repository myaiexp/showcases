// galacean example: Near and far clip planes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Near and far clip planes",
  summary:
    "A row of cubes receding from the camera while nearClipPlane and farClipPlane sweep through it: whatever lies outside the two planes disappears.",
  section: "Camera",
  tags: ['Camera', 'nearClipPlane', 'farClipPlane'],
  docs: [
    'repo/docs/en/graphics/camera/camera.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
