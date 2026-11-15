// galacean example: Picture in picture
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Picture in picture",
  summary:
    "A picture-in-picture inset: a second Camera with a small viewport and a cullingMask for a layer only it can see renders a top-down map over the main view.",
  section: "Camera",
  tags: ['Camera', 'cullingMask', 'viewport', 'priority', 'clearFlags'],
  docs: [
    'repo/docs/en/graphics/camera/multiCamera.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
