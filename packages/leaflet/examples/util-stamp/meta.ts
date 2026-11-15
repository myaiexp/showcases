// leaflet example: Util.stamp ids
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Util.stamp ids",
  summary:
    `Each object that goes through Util.stamp gets a unique _leaflet_id the first time and keeps it. Markers added by clicking the map (or by the card on its own) show the id stamped on them, and a plain object is stamped and re-stamped to show the id does not change. Leaflet uses these ids as keys for layers, listeners and DOM targets.`,
  section: "Utilities & DOM",
  tags: ["Util.stamp", "_leaflet_id", "Marker", "Tooltip", "LayerGroup.getLayerId"],
  docs: ['repo/src/core/Util.js', 'repo/src/layer/marker/Marker.js', 'repo/src/layer/LayerGroup.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
