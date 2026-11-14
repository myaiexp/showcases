// observable-plot example: Select: selector functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Select: selector functions',
  summary:
    'select takes a function of the series index and channel values, here over the four stocks of the select page. One picks the point nearest the median, one keeps every tenth point, one is a hand-written minimum.',
  section: 'Transform: Select',
  tags: ['dot', 'select', 'selector function', 'd3.least'],
  docs: ['repo/docs/transforms/select.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
