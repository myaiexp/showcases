// galacean example: Coordinate spaces: world, viewport, screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Coordinate spaces: world, viewport, screen",
  summary:
    "One point followed through the camera's space conversions: world to viewport, viewport to screen, and back, with the numbers shown live and the round trip landing on the same world position.",
  section: "Camera",
  tags: ['Camera', 'worldToViewportPoint', 'viewportToWorldPoint', 'worldToScreenPoint', 'screenToViewportPoint', 'viewportToScreenPoint'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
