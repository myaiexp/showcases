// leaflet example: A custom control with a button
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A custom control with a button",
  summary:
    "A custom control with a Home button that returns the map to its start and greys out while it is there. DomEvent.disableClickPropagation keeps the button's clicks from reaching the map; the caption counts map clicks and button presses.",
  section: "Controls",
  tags: ["Control", "getEvents", "DomEvent.disableClickPropagation", "DomUtil.create", "setView"],
  docs: ["repo/src/control/Control.js", "repo/MIGRATION.md", "repo/src/dom/DomEvent.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
