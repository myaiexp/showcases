// deck-gl example: TileLayer minZoom and maxZoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "TileLayer minZoom and maxZoom",
  summary:
    "maxZoom stops new levels past the data's detail (tiles stretch when you overzoom); minZoom hides the layer when zoomed too far out.",
  section: 'Geo layers',
  tags: ["TileLayer","minZoom","maxZoom","onViewStateChange"],
  docs: ["repo/docs/api-reference/geo-layers/tile-layer.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
