// galacean example: Orthographic size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Orthographic size",
  summary:
    "An orthographic Camera: the cubes keep one size at every depth, and orthographicSize (half the view height) zooms the box-shaped view volume in and out.",
  section: "Camera",
  tags: ['Camera', 'isOrthographic', 'orthographicSize'],
  docs: [
    'repo/docs/en/graphics/camera/camera.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
