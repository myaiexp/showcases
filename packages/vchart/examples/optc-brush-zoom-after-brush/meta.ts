// vchart example: Brush that zooms the axes: zoomAfterBrush
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Brush that zooms the axes: zoomAfterBrush",
  summary: "With zoomAfterBrush a rectangular brush box zooms the linked axes to the box instead of only highlighting points. In the card a scripted drag zooms in, then the chart is rebuilt; in the full view drag a box, and use the button to reset.",
  section: "Option: Components",
  tags: ["brush.zoomAfterBrush","brushType","axisRangeExpand","removeOnClick"],
  docs: [
    'repo/docs/assets/option/en/component/brush.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
