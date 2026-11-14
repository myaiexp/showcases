// observable-plot example: Line: multiple series with z
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: multiple series with z',
  summary:
    'Unemployment rates of US metro divisions as one line each, grouped by the z channel. Turn z off and every row joins a single zigzagging line.',
  section: 'Mark: Line',
  tags: ['line', 'z', 'ruleY', 'tidy data'],
  docs: ['repo/docs/marks/line.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
