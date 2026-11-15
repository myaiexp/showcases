// l7 example: zoomIn and zoomOut
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "zoomIn and zoomOut",
  summary:
    "zoomIn and zoomOut change the zoom by one level each; the panel reads getZoom() after every zoomend.",
  section: 'Scene',
  tags: ["zoomIn", "zoomOut", "getZoom", "zoomend"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
