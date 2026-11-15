// leaflet example: Fill rule
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fill rule",
  summary:
    "A polygon whose outline crosses itself, drawn with fillRule evenodd and nonzero. evenodd leaves the middle open; nonzero fills it.",
  section: "Vector layers",
  tags: ["Polygon", "fillRule", "setStyle"],
  docs: ["repo/src/layer/vector/Path.js", "repo/src/layer/vector/Polygon.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
