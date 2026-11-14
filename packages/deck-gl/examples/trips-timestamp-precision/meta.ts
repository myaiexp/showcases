// deck-gl example: TripsLayer timestamp precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TripsLayer timestamp precision",
  summary:
    "Timestamps are stored as float32: subtract a start time from epoch milliseconds, and check with Math.fround.",
  section: 'Geo layers',
  tags: ["TripsLayer","getTimestamps","Math.fround","currentTime"],
  docs: ["repo/docs/api-reference/geo-layers/trips-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
