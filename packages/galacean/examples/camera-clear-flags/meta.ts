// galacean example: Clear flags with two cameras
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clear flags with two cameras",
  summary:
    "A second Camera draws a spinning cube over the first camera's picture. Its clearFlags decide what it wipes first: everything, nothing, colour only or depth only, so the cube is hidden, cut by the wall, or drawn on top.",
  section: "Camera",
  tags: ['Camera', 'clearFlags', 'CameraClearFlags', 'priority', 'cullingMask'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
    'repo/docs/en/graphics/camera/multiCamera.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
