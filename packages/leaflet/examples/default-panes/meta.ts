// leaflet example: default-panes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The default panes",
  summary:
    "map.getPanes() lists the panes with their z-index and child counts: tilePane, overlayPane, shadowPane, markerPane, tooltipPane and popupPane. A marker, a circle, a polygon, a popup and a tooltip show which pane each goes to.",
  section: "Map panes",
  tags: ["getPanes", "Marker", "Circle", "Polygon", "bindPopup", "bindTooltip"],
  docs: ["repo/docs/examples/map-panes/index.md", "repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
