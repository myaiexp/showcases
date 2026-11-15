// leaflet example: setIcon and getIcon
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "setIcon and getIcon",
  summary: "setIcon() swaps the icon of a marker already on the map and getIcon() returns the current one. Between image icons the <img> element is reused; swapping to or from a DivIcon makes a new element. The panel reports which happened.",
  section: "Markers & icons",
  tags: ["Marker", "setIcon", "getIcon", "getElement", "DefaultIcon", "Icon", "DivIcon"],
  docs: ["repo/src/layer/marker/Marker.js", "repo/src/layer/marker/Icon.js", "repo/src/layer/marker/DivIcon.js", "repo/src/layer/marker/DefaultIcon.js"],
  provenance: 'pure',
  added: '2026-11-15',
});
