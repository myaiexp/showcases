// vchart example: Area series: areaLabel at the start or end
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Area series: areaLabel at the start or end",
  summary: "areaLabel puts one label on each area mark, at the start or the end of the area, showing the series name. position, offset and the label style are the options; a select flips the side and a stack switch changes the layout.",
  section: "Option: Series",
  tags: ["area.areaLabel","areaLabel.position","areaLabel.offset","stack"],
  docs: [
    'repo/docs/assets/option/en/series/area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
