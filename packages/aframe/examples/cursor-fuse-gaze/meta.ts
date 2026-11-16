// aframe example: cursor: a fuse-based gaze cursor on the camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "cursor: a fuse-based gaze cursor on the camera",
  summary: "A ring cursor is a child of the camera with fuse: true and fuseTimeout: 1000, so holding the gaze on a box for a second clicks it. The docs' cursor-listener cycles the box colour. The cursor ring shrinks while fusing and pops on click, using animation startEvents fusing and click.",
  section: 'Components',
  tags: ["cursor", "fuse", "fuseTimeout", "fusing", "click", "camera", "geometry", "ring", "animation", "startEvents"],
  docs: ["repo/docs/components/cursor.md", "repo/docs/components/animation.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
