// leaflet example: WMS transparent and format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS transparent and format",
  summary:
    "A WMS overlay of coast, border and graticule lines over a terrain tile layer. Toggles set the transparent and format parameters with setParams(): without transparent the server also paints the ocean and covers the base.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "transparent", "format", "setParams"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/WMSTileLayer.js", "repo/docs/examples/wms/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
