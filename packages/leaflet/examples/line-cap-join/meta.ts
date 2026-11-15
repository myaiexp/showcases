// leaflet example: Line cap and join
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Line cap and join",
  summary:
    "A thick polyline with lineCap (butt, round, square) and lineJoin (miter, round, bevel), with the same line at weight 1 drawn on top to show the real path.",
  section: "Vector layers",
  tags: ["Polyline", "lineCap", "lineJoin", "setStyle"],
  docs: ["repo/src/layer/vector/Path.js", "repo/src/layer/vector/Polyline.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
