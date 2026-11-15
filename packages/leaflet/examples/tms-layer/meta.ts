// leaflet example: TMS layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TMS layer",
  summary:
    "A TMS tileset used as a TileLayer: the URL is base/tileset/{z}/{x}/{y}.png with tms: true, which counts rows from the bottom. A select picks the tileset folder, and the log shows the XYZ coords of each tile beside the TMS row in the URL.",
  section: "WMS & TMS",
  tags: ["TileLayer", "tms", "requestUrl"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/wms/index.md", "repo/src/layer/tile/TileLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
