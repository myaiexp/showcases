// leaflet example: WMS crs option
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS crs option",
  summary:
    "On an EPSG3857 map, a WMS coast layer with the crs option set to EPSG3395 or EPSG4326, over a reference coast layer in Web Mercator. The server draws each tile in the layer's crs, and Leaflet places it as an ordinary tile, so EPSG4326 drifts from the reference.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "crs", "EPSG3395", "EPSG4326", "wmsParams"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/WMSTileLayer.js", "repo/docs/examples/wms/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
