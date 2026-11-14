// deck-gl example: TripsLayer with altitude
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TripsLayer with altitude",
  summary:
    "Paths with a third coordinate: flights climb and descend as the playhead moves, seen from a pitched camera.",
  section: 'Geo layers',
  tags: ["TripsLayer","getPath","3D positions"],
  docs: ["repo/docs/api-reference/geo-layers/trips-layer.md","repo/docs/api-reference/layers/path-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
