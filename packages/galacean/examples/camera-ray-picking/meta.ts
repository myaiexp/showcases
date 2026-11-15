// galacean example: Picking with a viewport ray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Picking with a viewport ray",
  summary:
    "screenPointToRay turns a pointer position into a world ray, which is tested against each renderer's bounds; the nearest hit lights up. The card moves a ghost pointer, the full view uses the mouse.",
  section: "Camera",
  tags: ['Camera', 'screenPointToRay', 'Ray', 'BoundingBox', 'Renderer.bounds'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/renderer/renderer.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
