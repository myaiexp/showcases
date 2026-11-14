// playcanvas example: Camera clear colour and depth flags
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera clear colour and depth flags",
  summary: "A second camera on its own layer draws over the first with clearColorBuffer off. With clearDepthBuffer on, a cone standing behind a wall is drawn over it; with it off the wall hides the cone. Both flags are toggles in the full view.",
  section: "Components",
  tags: ["clearColorBuffer","clearDepthBuffer","layers","priority","Layer"],
  docs: ["repo/docs/user-manual/editor/scenes/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
