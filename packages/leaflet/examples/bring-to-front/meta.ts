// leaflet example: Bring to front and back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bring to front and back",
  summary:
    "Three overlapping circles reordered with bringToFront and bringToBack. Paths stack in the order they were added until told otherwise.",
  section: "Vector layers",
  tags: ["Circle", "bringToFront", "bringToBack"],
  docs: ["repo/src/layer/vector/Path.js", "repo/src/layer/vector/Circle.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
