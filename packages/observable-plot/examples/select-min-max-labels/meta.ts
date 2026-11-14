// observable-plot example: Select: label the extremes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select: label the extremes',
  summary:
    'selectMinY and selectMaxY pick the lowest and highest point of the series for text labels. Toggles show or hide each one.',
  section: 'Transform: Select',
  tags: ['line', 'text', 'selectMinY', 'selectMaxY'],
  docs: ['repo/docs/transforms/select.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
