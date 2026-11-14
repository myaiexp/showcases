// observable-plot example: Select: label the last value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select: label the last value',
  summary:
    'selectLast keeps one point of the series, here the final close, so a text mark labels it. A toggle swaps in selectFirst to show that first and last follow input order.',
  section: 'Transform: Select',
  tags: ['line', 'text', 'selectLast', 'selectFirst'],
  docs: ['repo/docs/transforms/select.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
