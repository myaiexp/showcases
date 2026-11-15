// galacean example: Camera looks down negative Z
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera looks down negative Z",
  summary:
    "A camera at the origin turning on the spot, with a coloured cube on each side. The caption reads the camera's worldForward: at rest it is the negative Z axis, the direction the camera views.",
  section: "Camera",
  tags: ['Camera', 'transform.worldForward', 'transform.setRotation'],
  docs: [
    'repo/docs/en/graphics/camera/camera.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
