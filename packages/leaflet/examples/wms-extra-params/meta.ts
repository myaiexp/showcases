// leaflet example: Extra WMS parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Extra WMS parameters",
  summary:
    "A WMS layer given the options time and format_options, which Leaflet does not know and so sends in every GetMap URL, and opacity and attribution, which it does and so does not send. A select changes time with setParams(); the side panel shows the full request.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "setParams", "wmsParams", "format_options", "time"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ['repo/src/layer/tile/WMSTileLayer.js', 'repo/src/core/Util.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
