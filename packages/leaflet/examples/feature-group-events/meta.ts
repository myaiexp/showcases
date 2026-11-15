// leaflet example: Feature group events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Feature group events",
  summary:
    "A FeatureGroup of a marker, a polyline and a circle with one popup and one click handler on the group. The event's propagatedFrom names the member clicked; layeradd and layerremove are logged too.",
  section: "Layer groups",
  tags: ["FeatureGroup", "propagatedFrom", "bindPopup", "layeradd", "layerremove"],
  docs: ["repo/src/layer/FeatureGroup.js", "repo/src/core/Events.js", "repo/MIGRATION.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
