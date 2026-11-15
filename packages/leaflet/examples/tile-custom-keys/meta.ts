// leaflet example: Custom keys in the URL
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom keys in the URL",
  summary:
    "The URL template contains a {look} key that is not one Leaflet knows, so it is read from the layer's options. Choosing a look writes layer.options.look and calls redraw(); the log shows the new URLs.",
  section: "Tile layers",
  tags: ["TileLayer", "options", "{look}", "redraw", "Util.template"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/TileLayer.js", "repo/src/core/Util.js", "repo/src/layer/tile/GridLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
