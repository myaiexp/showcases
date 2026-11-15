// tanstack-charts example: Countries on an Equal Earth map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Countries on an Equal Earth map",
  summary:
    "About 175 country polygons from the bundled world-atlas file, converted to GeoJSON with topojson-client and drawn by geoShape. A projection descriptor fits them to the plot, and a made-up value per country drives a sequential color scale.",
  section: "Geo Shape Mark",
  tags: ['tooltip format', 'geoShape', 'projection', 'fit', 'inset', 'color', 'tooltip'],
  docs: [
    'repo/docs/guides/tooltips-and-focus.md',
    'repo/docs/reference/marks/geo.md',
    'repo/docs/reference/scales-guides-and-color.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
