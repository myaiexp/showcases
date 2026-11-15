// leaflet example: Stacking tile layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Stacking tile layers",
  summary:
    "An opaque dark base layer and a transparent layer of coast, border and label lines share the tile pane. The slider calls setZIndex() on the lines; below the base's zIndex they are hidden. bringToFront() and bringToBack() set the zIndex above or below every other layer in the pane.",
  section: "Tile layers",
  tags: ["GridLayer", "zIndex", "setZIndex", "bringToFront", "bringToBack"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
