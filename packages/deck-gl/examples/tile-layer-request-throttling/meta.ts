// deck-gl example: TileLayer maxRequests and debounceTime
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer maxRequests and debounceTime",
  summary:
    "maxRequests caps concurrent getTileData calls and debounceTime waits for the view to settle; the readout counts what actually ran.",
  section: 'Geo layers',
  tags: ["TileLayer","maxRequests","debounceTime","signal"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
