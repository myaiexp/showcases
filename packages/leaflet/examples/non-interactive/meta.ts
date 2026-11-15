// leaflet example: Non-interactive paths
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Non-interactive paths",
  summary:
    "Two circles, one with interactive: false. Clicking the first fires its own click and the map's; clicking the second only reaches the map.",
  section: "Vector layers",
  tags: ["Circle", "interactive", "click"],
  docs: ["repo/src/layer/vector/Path.js", "repo/src/layer/Layer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
