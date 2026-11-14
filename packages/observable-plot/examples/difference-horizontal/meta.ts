// observable-plot example: Difference: horizontal with differenceX
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Difference: horizontal with differenceX",
  summary: "differenceX is the sideways version: time runs down the y axis and the anomaly is drawn along x, filled red or blue by its sign. Custom fill opacities show the positive and negative areas.",
  section: 'Mark: Difference',
  tags: ['differenceX', 'positiveFill', 'negativeFill', 'positiveFillOpacity', 'negativeFillOpacity'],
  docs: ['repo/docs/marks/difference.md', 'repo/docs/data/gistemp.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
