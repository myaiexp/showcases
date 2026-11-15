// leaflet example: WMS layer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS layer",
  summary:
    "A WMSTileLayer on a pretend WMS server. A select sets the layers option, and the side panel prints the decoded GetMap URL of the latest tile: layers, bbox, width, height, srs and the rest.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "layers", "format", "requestUrl"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/WMSTileLayer.js", "repo/docs/examples/wms/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
