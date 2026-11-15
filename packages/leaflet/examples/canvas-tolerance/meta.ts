// leaflet example: Canvas click tolerance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Canvas click tolerance",
  summary:
    "A 2 px polyline on a Canvas renderer, with a slider for its tolerance option. A pale band shows the click area; clicks 8 px beside the line miss at tolerance 0 and hit at 12.",
  section: "Renderers",
  tags: ["Canvas", "tolerance", "Polyline", "click"],
  docs: ["repo/src/layer/vector/Canvas.js", "repo/src/layer/vector/Path.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
