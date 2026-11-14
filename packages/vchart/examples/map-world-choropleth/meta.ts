// vchart example: Map: a world choropleth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: a world choropleth",
  summary:
    "A map series on a registered GeoJSON world: type map, the map name, a linear colour scale on valueField colours every country. New values arrive every two seconds through updateData and the regions recolour in place.",
  section: "Map",
  tags: ['map','registerMap','geojson','nameField','valueField'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Map.md',
    'repo/docs/assets/option/en/series/map.md',
    'repo/docs/assets/option/en/chart/map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
