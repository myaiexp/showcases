// vchart example: Map: showDefaultName and region labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: showDefaultName and region labels",
  summary: "On a South America map only three countries have data and a nameMap renames them. With showDefaultName on, the other regions keep their own map names in the labels; off, only the matched ones are labelled. A select flips it.",
  section: "Option: Series",
  tags: ["map.showDefaultName","map.nameMap","map.label","defaultFillColor"],
  docs: [
    'repo/docs/assets/option/en/series/map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
