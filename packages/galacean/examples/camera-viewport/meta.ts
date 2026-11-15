// galacean example: Viewport rectangle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Viewport rectangle",
  summary:
    "A Camera confined to a normalised viewport rectangle that drifts and resizes over the canvas; the caption reads the viewport and the pixelViewport it resolves to.",
  section: "Camera",
  tags: ['Camera', 'viewport', 'pixelViewport', 'Vector4'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
