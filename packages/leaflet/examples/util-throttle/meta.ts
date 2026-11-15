// leaflet example: Util.throttle on pointermove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Util.throttle on pointermove",
  summary:
    `Util.throttle wraps a function so it runs at most once per interval, calling again with the latest arguments when the wait ends. Two listeners sit on the map's pointermove: one runs every time, one is throttled; the counters show how many calls each got. A slider sets the interval.`,
  section: "Utilities & DOM",
  tags: ["Util.throttle", "pointermove", "LeafletMap"],
  docs: ['repo/src/core/Util.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
