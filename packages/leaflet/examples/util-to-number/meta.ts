// leaflet example: Util.toNumber versus Number
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Util.toNumber versus Number",
  summary:
    `Util.toNumber converts numeric strings and passes numbers through, but returns NaN for the values Number() quietly turns into 0 or 1: empty strings, null, booleans. Two text fields feed a marker's latitude and longitude; a field that is empty or not numeric is flagged instead of sending the marker to 0, 0. The card cycles through sample inputs.`,
  section: "Utilities & DOM",
  tags: ["Util.toNumber", "Marker", "setLatLng"],
  docs: ['repo/src/core/Util.js', 'repo/src/layer/marker/Marker.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
