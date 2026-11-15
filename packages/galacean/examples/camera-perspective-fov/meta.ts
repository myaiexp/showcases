// galacean example: Perspective field of view
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Perspective field of view",
  summary:
    "A perspective Camera whose fieldOfView sweeps between a narrow telephoto and a wide-angle lens while the row of cubes stays put; a slider sets it in the full view.",
  section: "Camera",
  tags: ['Camera', 'fieldOfView', 'nearClipPlane', 'farClipPlane'],
  docs: [
    'repo/docs/en/graphics/camera/camera.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
