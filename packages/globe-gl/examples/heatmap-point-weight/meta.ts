// globe-gl example: Heatmaps: point weight
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Heatmaps: point weight",
  summary:
    "Two globes show one point per city, first with weight 1 and then with heatmapPointWeight set to the city's population, so the big metros dominate. Lat and lng are read from the city objects by attribute name.",
  section: "Heatmaps Layer",
  tags: ["heatmapPointWeight", "heatmapPointLat", "heatmapPointLng", "heatmapBandwidth"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
