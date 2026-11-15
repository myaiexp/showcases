// leaflet example: WMS on an EPSG4326 map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "WMS on an EPSG4326 map",
  summary:
    "The same WMS layer on maps with crs EPSG3857, EPSG4326 and EPSG3395. The map crs is read when the map is created, so a select makes a new map. The side panel shows the SRS and BBOX of the requests, in degrees for EPSG4326 and in metres for the others.",
  section: "WMS & TMS",
  tags: ["WMSTileLayer", "EPSG4326", "EPSG3857", "EPSG3395", "crs"],
  // The vendored docs files this example was built from (keys of docs/MANIFEST.json).
  docs: ["repo/docs/examples/wms/index.md", "repo/src/layer/tile/WMSTileLayer.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
