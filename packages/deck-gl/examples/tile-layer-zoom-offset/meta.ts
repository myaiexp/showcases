// deck-gl example: TileLayer zoomOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer zoomOffset",
  summary:
    "zoomOffset shifts the zoom level tiles are fetched at: a positive offset loads sharper tiles, a negative one coarser, and more or fewer of them.",
  section: 'Geo layers',
  tags: ["TileLayer","zoomOffset","onViewportLoad"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
