// leaflet example: Video overlay from a canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Video overlay from a canvas",
  summary:
    "A VideoOverlay playing a moving picture drawn on a canvas and streamed into a muted <video> through captureStream. getElement() gives the video element for play() and pause(), as the overlays tutorial does.",
  section: "Image, video & SVG overlays",
  tags: ["VideoOverlay", "getElement", "load", "autoplay"],
  docs: ["repo/src/layer/VideoOverlay.js", "repo/docs/examples/overlays/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
