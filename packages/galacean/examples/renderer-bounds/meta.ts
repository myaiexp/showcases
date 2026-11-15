// galacean example: Renderer bounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Renderer bounds",
  summary:
    "renderer.bounds is the world-space bounding box of a renderer. A translucent box is scaled to it each frame around a long spinning bar, so you watch the box grow and shrink as the bar turns.",
  section: "Renderer",
  tags: ['Renderer.bounds', 'BoundingBox', 'MeshRenderer'],
  docs: [
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
