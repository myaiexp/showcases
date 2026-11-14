// echarts example: Overlapping labels on lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overlapping labels on lines',
  summary:
    'Every point of a dense line carries a value label, and the labels collide. Compare no layout, labelLayout.hideOverlap, moveOverlap shiftX and shiftY, and a labelLayout callback that rotates and offsets each label. A slider changes how many points there are.',
  section: 'Option: series.line',
  tags: ['label', 'labelLayout', 'hideOverlap', 'moveOverlap', 'shiftX', 'shiftY', 'rotate', 'dy'],
  docs: ['repo/en/option/series/line.md', 'repo/en/option/partial/label-layout.md', 'repo/en/option/partial/label.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
