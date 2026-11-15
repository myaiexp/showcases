// galacean example: Frustum culling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Frustum culling",
  summary:
    "Cubes slide across the view and out of it. With enableFrustumCulling on, the renderers outside the frustum report isCulled; turning it off draws everything anyway and the count drops to zero.",
  section: "Camera",
  tags: ['Camera', 'enableFrustumCulling', 'Renderer.isCulled'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
