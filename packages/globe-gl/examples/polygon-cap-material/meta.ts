// globe-gl example: Polygons: cap material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygons: cap material",
  summary:
    "polygonCapMaterial returns a different MeshPhongMaterial per country (own colour, emissive glow and shininess). While it is set polygonCapColor is ignored; a checkbox returns falsy materials to reveal that fallback colour.",
  section: "Polygons Layer",
  tags: ["polygonCapMaterial", "polygonCapColor"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
