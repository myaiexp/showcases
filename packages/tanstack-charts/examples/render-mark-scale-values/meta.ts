// tanstack-charts example: Point values that differ from scale values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Point values that differ from scale values",
  summary:
    "createMarkWithScaleValues builds a task bar mark whose scale values are numbers (start and end days) while its interaction points carry a readable range label as their x value. The tooltip shows the label because that is what the point stores, even though the x axis is numeric.",
  section: "Custom Extensions",
  tags: ['createMarkWithScaleValues', 'ChartMarkPointX', 'ChartMarkScaleX', 'interval', 'tooltip'],
  docs: ['repo/docs/reference/custom-extensions.md', 'repo/docs/guides/custom-marks-and-renderers.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
