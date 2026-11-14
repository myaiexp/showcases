// deck-gl example: TileLayer refinementStrategy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer refinementStrategy",
  summary:
    "While new tiles load, best-available backfills with cached tiles, no-overlap avoids stacked tiles, never shows gaps, and a function decides tile by tile.",
  section: 'Geo layers',
  tags: ["TileLayer","refinementStrategy","isVisible","isSelected","isLoaded"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
