// tanstack-charts example: A custom color resolver
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A custom color resolver',
  summary:
    'color.resolver takes a ChartColorScale with an id and a resolve function. It receives the observed values, the optional domain and range and the theme, and returns a ResolvedColorScale with its own map. This one buckets numbers into three ranges with hand-chosen thresholds, so the legend shows exact bins.',
  section: 'Scales, Guides, and Color',
  tags: ['color.resolver', 'ChartColorScale', 'ResolvedColorScale', 'thresholds'],
  docs: ['repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
