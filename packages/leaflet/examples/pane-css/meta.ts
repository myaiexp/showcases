// leaflet example: pane-css
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Styling a pane",
  summary:
    "A pane is a div, so CSS on it applies to its layers as a group. EU country polygons in a pane from createPane('tint') get opacity and mix-blend-mode set from a slider and a selector, over terrain tiles.",
  section: "Map panes",
  tags: ["createPane", "pane", "GeoJSON", "opacity", "mix-blend-mode"],
  docs: ['repo/docs/examples/map-panes/index.md', 'repo/src/map/Map.js', 'repo/src/layer/ImageOverlay.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
