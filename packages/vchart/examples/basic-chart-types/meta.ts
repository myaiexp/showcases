// vchart example: One dataset, many chart types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One dataset, many chart types',
  summary:
    'The same five rows become a bar, line, area, scatter, pie, rose, radar or funnel chart by changing type and the field mapping: xField and yField in Cartesian charts, categoryField and valueField in polar ones. The full view has a type selector; the card steps through them.',
  section: 'Basic',
  tags: ['type', 'xField', 'yField', 'categoryField', 'valueField', 'bar', 'line', 'area', 'scatter', 'pie', 'rose', 'radar', 'funnel'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Basic/A_Basic_Spec.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
