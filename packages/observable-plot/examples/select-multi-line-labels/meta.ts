// observable-plot example: Select: label every series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select: label every series',
  summary:
    'The select transform groups by z, fill or stroke, so selectLast keeps one point per stock and labels the end of each line.',
  section: 'Transform: Select',
  tags: ['line', 'text', 'selectLast', 'z'],
  docs: ['repo/docs/transforms/select.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
