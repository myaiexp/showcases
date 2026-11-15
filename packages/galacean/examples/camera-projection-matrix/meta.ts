// galacean example: Custom projection matrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom projection matrix",
  summary:
    "Assigning a hand-built Matrix to projectionMatrix (a skewed perspective here) replaces the one derived from fieldOfView; resetProjectionMatrix goes back to automatic.",
  section: "Camera",
  tags: ['Camera', 'projectionMatrix', 'resetProjectionMatrix', 'Matrix'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
