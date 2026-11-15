// leaflet example: WMS uppercase parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS uppercase parameters",
  summary:
    "A toggle sets the WMSTileLayer uppercase option, and redraw() requests the tiles again. The side panel shows the parameter names in lowercase or as WIDTH, HEIGHT and BBOX.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "uppercase", "redraw"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: [
    'repo/src/layer/tile/WMSTileLayer.js',
    'repo/src/layer/LayerBase.js',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
