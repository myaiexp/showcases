// leaflet example: WMS layers in a layers control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS layers in a layers control",
  summary:
    "A LayersControl with four WMS base layers (land, labels, and both in either order) and one WMS overlay. A base layer with two WMS layers is a single request composed by the server; the overlay is a second request composed in the browser. The log shows the LAYERS of each request.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "LayersControl", "layers", "transparent"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/wms/index.md", "repo/docs/examples/layers-control/index.md", "repo/src/layer/tile/WMSTileLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
