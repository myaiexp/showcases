// vchart example: Map: South America from TopoJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: South America from TopoJSON",
  summary:
    "VChart.registerMap with type topojson and the name of the topology object, then a map series on it. Countries without a data row keep defaultFillColor; the values change every two seconds.",
  section: "Map",
  tags: ['registerMap','topojson','object','defaultFillColor','label'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Map.md',
    'repo/docs/assets/option/en/series/map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
