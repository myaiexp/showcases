// leaflet example: pane-option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "The pane option",
  summary:
    "The pane layer option moves a layer into another pane. A semi-transparent Circle starts in the default overlayPane under four markers; a selector recreates it in shadowPane, markerPane, tooltipPane or popupPane, changing what covers what.",
  section: "Map panes",
  tags: ["pane", "Circle", "getPane", "Marker"],
  docs: ['repo/docs/examples/map-panes/index.md', 'repo/src/map/Map.js', 'repo/src/layer/vector/Circle.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
