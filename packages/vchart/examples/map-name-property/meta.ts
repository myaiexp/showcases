// vchart example: Map: nameProperty
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: nameProperty",
  summary:
    "nameProperty names the geographic property of the map features that the data's nameField is matched against. The same countries are matched by their name or by an ISO code property, switched from a select.",
  section: "Map",
  tags: ['nameProperty','nameField','registerMap','geojson'],
  docs: [
    'repo/docs/assets/option/en/series/map.md',
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
