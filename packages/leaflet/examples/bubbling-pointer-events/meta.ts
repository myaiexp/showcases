// leaflet example: Bubbling pointer events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bubbling pointer events",
  summary:
    "Two circles that log clicks. By default a path click also fires a click on the map; with bubblingPointerEvents: false it stays on the path.",
  section: "Vector layers",
  tags: ["Circle", "bubblingPointerEvents", "click"],
  docs: ["repo/src/layer/vector/Path.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
