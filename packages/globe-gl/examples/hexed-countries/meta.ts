// globe-gl example: Hexed Polygons: countries as hexagons
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Hexed Polygons: countries as hexagons",
  summary:
    "hexPolygonsData tiles every country with H3 hexagons (resolution 3 in the full view, 2 in cards), coloured per country, with a name tooltip from hexPolygonLabel.",
  section: "Hexed Polygons Layer",
  tags: ["hexPolygonsData", "hexPolygonResolution", "hexPolygonMargin", "hexPolygonColor", "hexPolygonLabel"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
