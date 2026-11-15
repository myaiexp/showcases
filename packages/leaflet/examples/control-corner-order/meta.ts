// leaflet example: Control order within a corner
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Control order within a corner",
  summary:
    "Three small custom controls added to each corner in turn. The top corners stack them in add order downward, the bottom corners stack them upward, so the first added is always nearest the map edge in the bottom corners and the top in the top ones.",
  section: "Controls",
  tags: ["Control", "addTo", "onAdd", "position"],
  docs: ["repo/src/control/Control.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
