// l7 example: GeoLocate transform and getGeoLocation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "GeoLocate transform and getGeoLocation",
  summary:
    "The control centres the map on the browser's location, passing it through transform first; getGeoLocation() returns the raw position. Nothing asks until you click.",
  section: "Component",
  tags: ["GeoLocate","transform","getGeoLocation"],
  docs: ["repo/site/docs/api/component/geolocate.en.md","repo/site/docs/api/common/control/btn-api.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
