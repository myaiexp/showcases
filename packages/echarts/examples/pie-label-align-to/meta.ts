// echarts example: Label alignment to line or edge
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Label alignment to line or edge',
  summary:
    'Outside labels on a household budget pie. Switch label.alignTo between edge, labelLine and none, then tune edgeDistance, bleedMargin and distanceToLabelLine to see where the text lands.',
  section: 'Option: series.pie',
  tags: ['pie', 'label.alignTo', 'label.edgeDistance', 'label.bleedMargin', 'label.distanceToLabelLine'],
  docs: ['repo/en/option/series/pie.md', 'repo/en/option/partial/label.md', 'repo/en/option/partial/label-line.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
