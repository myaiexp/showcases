// leaflet example: EPSG3395 against EPSG3857
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "EPSG3395 against EPSG3857",
  summary:
    "The same four latitudes as markers on an EPSG3857 map and an EPSG3395 map, with the projected y of each in both CRSs side by side: the elliptical Mercator differs more the further from the equator.",
  section: "Coordinate systems",
  tags: ["EPSG3395", "EPSG3857", "project", "crs", "MercatorProjection"],
  docs: [
    'repo/src/geo/crs/EPSG3395.js',
    'repo/src/geo/crs/EPSG3857.js',
    'repo/src/geo/projection/MercatorProjection.js',
    'repo/docs/examples/wms/index.md',
    'repo/src/layer/marker/Marker.js',
    'repo/src/layer/Layer.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
