// leaflet example: WMS version and BBOX axis order
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS version and BBOX axis order",
  summary:
    "A WMS layer on an EPSG4326 map with version 1.1.1 or 1.3.0, switched with setParams(). The map is identical, but the request is not: 1.3.0 names the parameter CRS instead of SRS and orders the BBOX south, west, north, east instead of west, south, east, north.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "version", "setParams", "EPSG4326", "bbox"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/src/layer/tile/WMSTileLayer.js", "repo/docs/examples/wms/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
