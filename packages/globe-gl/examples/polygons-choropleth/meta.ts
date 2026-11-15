// globe-gl example: Polygons: choropleth by area
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Polygons: choropleth by area",
  summary:
    "polygonsData with every Natural Earth country, coloured by land area through polygonCapColor (teal for small, orange for large). A select switches the colour scale between logarithmic and linear.",
  section: "Polygons Layer",
  tags: ["polygonsData", "polygonCapColor", "polygonSideColor", "polygonStrokeColor", "polygonAltitude"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
