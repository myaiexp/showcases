// leaflet example: WMS setParams
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS setParams",
  summary:
    "setParams() on a WMS layer: selects change layers and styles, and a noRedraw toggle holds the new values back until redraw(). The log shows the call and the LAYERS and STYLES of the requests that follow.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "setParams", "wmsParams", "layers", "styles", "redraw"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/WMSTileLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
