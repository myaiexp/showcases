// leaflet example: Video overlay keepAspectRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video overlay keepAspectRatio",
  summary:
    "The same wide canvas video in two square bounds: the left VideoOverlay keeps its aspect ratio (default, letterboxed), the right one has keepAspectRatio: false and stretches to fill.",
  section: "Image, video & SVG overlays",
  tags: ["VideoOverlay", "keepAspectRatio", "muted"],
  docs: ["repo/src/layer/VideoOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
