// vchart example: Polar mapping: categoryField and valueField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Polar mapping: categoryField and valueField',
  summary:
    'A pie spec maps data with categoryField and valueField instead of xField and yField, and adds a title, legend, label and a custom tooltip. The full view changes outerRadius and the legend side; values refresh with updateData.',
  section: 'Basic',
  tags: ['pie', 'categoryField', 'valueField', 'outerRadius', 'title', 'legends', 'label', 'tooltip.mark.content'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Basic/A_Basic_Spec.md', 'repo/docs/assets/guide/en/tutorial_docs/Basic/How_to_Import_VChart.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
