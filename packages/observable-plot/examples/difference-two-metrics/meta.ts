// observable-plot example: Difference: 2020 against 2019 travelers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Difference: 2020 against 2019 travelers",
  summary: "differenceY with y1 and y2 columns compares two metrics: TSA checkpoint travelers per day in 2020 against 2019, green when 2020 is higher and blue when lower. The tip formats the date.",
  section: 'Mark: Difference',
  tags: ['differenceY', 'y1', 'y2', 'axisY', 'ruleY', 'tip'],
  docs: ['repo/docs/marks/difference.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
