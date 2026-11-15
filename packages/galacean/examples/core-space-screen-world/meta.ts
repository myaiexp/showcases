// galacean example: Space: world, viewport and screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Space: world, viewport and screen",
  summary:
    "A point moving in world space and where it lands on screen through camera.worldToScreenPoint and worldToViewportPoint. In the full view, move over the canvas to send a screen point back with screenToWorldPoint.",
  section: "Core",
  tags: ['Camera', 'worldToScreenPoint', 'screenToWorldPoint', 'worldToViewportPoint'],
  docs: [
    'repo/docs/en/core/space.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
