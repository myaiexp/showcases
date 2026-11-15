// globe-gl example: Polygons: click and right-click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygons: click and right-click",
  summary:
    "onPolygonClick flies the camera to the clicked country with pointOfView and highlights it in gold; onPolygonRightClick clears the selection and zooms back out.",
  section: "Polygons Layer",
  tags: ["onPolygonClick", "onPolygonRightClick", "pointOfView", "polygonLabel"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
