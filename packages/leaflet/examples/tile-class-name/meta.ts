// leaflet example: Tile layer className
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Tile layer className",
  summary:
    "A tile layer's className option puts a CSS class on its container, and the example's CSS applies a filter to it: sepia, inverted or blurred. Choosing a class builds a new layer, since className is read when the layer is added.",
  section: "Tile layers",
  tags: ["TileLayer", "className", "getContainer"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/tile/GridLayer.js', 'repo/src/layer/LayerBase.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
