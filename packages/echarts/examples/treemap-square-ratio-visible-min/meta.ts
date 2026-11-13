// echarts example: Treemap squareRatio and visibleMin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Treemap squareRatio and visibleMin",
  summary:
    "Change the aspect ratio the treemap layout aims for with squareRatio, and hide tiny rectangles with visibleMin and hide the contents of small groups with childrenVisibleMin. Many uneven nodes make the effect obvious.",
  section: 'Option: series.treemap',
  tags: ['treemap', 'squareRatio', 'visibleMin', 'childrenVisibleMin', 'roam', 'scaleLimit'],
  docs: ['repo/en/option/series/treemap.md', 'repo/en/option/partial/roam.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
