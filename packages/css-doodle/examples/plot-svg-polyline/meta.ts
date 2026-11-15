// css-doodle example: A polyline from @Plot points
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A polyline from @Plot points",
  summary:
    "With points, @Plot returns the whole list as one value, which a polyline draws as a line. Here 360 points of an Archimedean spiral turn three times.",
  section: 'Shapes',
  tags: ['@Plot', '@svg', 'polyline', 'points'],
  docs: ['pages/css-doodle-com/reference/function-plot.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
