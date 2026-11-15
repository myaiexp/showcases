// galacean example: Four viewports
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Four viewports",
  summary:
    "Four cameras with a viewport each tile the canvas: front, side, top and a rotating perspective view of the same cluster of shapes, the multi-camera split screen from the docs.",
  section: "Camera",
  tags: ['Camera', 'viewport', 'priority', 'Vector4'],
  docs: [
    'repo/docs/en/graphics/camera/multiCamera.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
