// echarts example: Gauge as a clock face
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gauge as a clock face',
  summary:
    'Three gauge series share one dial (startAngle 90, a full turn to endAngle -270) and become the hour, minute and second hands of a live clock. Rotate the start angle, flip clockwise or shift the time zone.',
  section: 'Option: series.gauge',
  tags: ['gauge', 'startAngle', 'endAngle', 'clockwise', 'min', 'max', 'splitNumber', 'axisLabel.formatter', 'pointer'],
  docs: ['repo/en/option/series/gauge.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
