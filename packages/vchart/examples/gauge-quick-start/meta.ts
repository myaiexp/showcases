// vchart example: Gauge quick start
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Gauge quick start",
  summary:
    "A gauge chart is a dial plus a pointer: categoryField and valueField read one row, innerRadius, outerRadius, startAngle and endAngle shape a half-circle dial, and the pointer swings to each new reading from updateData.",
  section: "Gauge, Progress and Liquid",
  tags: ['gauge', 'categoryField', 'valueField', 'innerRadius', 'outerRadius', 'startAngle', 'endAngle'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Gauge.md',
    'repo/docs/assets/option/en/series/gauge.md',
    'repo/docs/assets/option/en/chart/gauge.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});
