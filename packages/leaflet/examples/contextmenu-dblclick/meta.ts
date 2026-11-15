// leaflet example: contextmenu-dblclick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Right click, double click and preclick",
  summary:
    "Logs preclick, click, dblclick and contextmenu on the map in the order they fire; preclick comes before click. A double click also zooms in. The card sends a click, a right click and a double click.",
  section: "Map events & conversion",
  tags: ["preclick", "click", "dblclick", "contextmenu", "map.on"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
