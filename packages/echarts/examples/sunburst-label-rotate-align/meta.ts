// echarts example: Sunburst label rotate, align and minAngle
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sunburst label rotate, align and minAngle",
  summary:
    "Labels on a sunburst can lie radially, run tangentially, or turn by a fixed angle. Pick label.rotate, the align of the text against the ring, and the minAngle below which small sectors drop their label.",
  section: 'Option: series.sunburst',
  tags: ['sunburst', 'label.rotate', 'label.align', 'label.minAngle', 'radial', 'tangential'],
  docs: ['repo/en/option/series/sunburst.md', 'repo/en/option/partial/label-rotate-tangential.md', 'repo/en/option/partial/label.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
