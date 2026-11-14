// playcanvas example: Camera viewport rect and priority
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera viewport rect and priority",
  summary: "Three cameras share one canvas: a half-width main view, a top-down view in the rest, and a small picture-in-picture with a higher priority. The full view moves the split, the inset's rect, and its priority.",
  section: "Components",
  tags: ["rect","priority","scissorRect","split screen","picture-in-picture"],
  docs: ["repo/docs/user-manual/editor/scenes/components/camera.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
