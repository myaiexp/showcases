// observable-plot example: Density: contours around a point cloud
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: contours around a point cloud",
  summary: "Two density marks over Old Faithful eruptions: a faint default one with 20 thresholds and a bolder one with 4, plus the dots. The full view adds a bandwidth slider and a thresholds slider.",
  section: 'Mark: Density',
  tags: ['density', 'bandwidth', 'thresholds', 'strokeWidth', 'dot'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/faithful.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
