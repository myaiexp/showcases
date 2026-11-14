// vchart example: FAQ: custom legend items from legends.data
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "FAQ: custom legend items from legends.data",
  summary:
    "legends.data receives the computed items. Adding a value to each shows a number next to the label (styled by item.value), and changing one item's shape.symbolType gives that item its own symbol.",
  section: 'FAQ',
  tags: ['legends.data','item.value','symbolType','item.label'],
  docs: [
    'repo/docs/assets/faq/en/157- How to individually configure legend styles and change graphic shapes in VChart.md',
    'repo/docs/assets/faq/en/184-How to customize the shape and text style of the legend.md',
    'repo/docs/assets/faq/en/194-How to customize the text content of the legend.md',
    'repo/docs/assets/option/en/component/legend-discrete.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
