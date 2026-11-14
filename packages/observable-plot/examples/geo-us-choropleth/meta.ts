// observable-plot example: Geo: US choropleth
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo: US choropleth',
  summary:
    'County unemployment drawn with the geo mark on albers-usa, filled by a field found in each feature properties, on a quantile color scale. The select swaps the scheme.',
  section: 'Mark: Geo',
  tags: ['geo', 'fill', 'quantile', 'albers-usa', 'tip', 'legend'],
  docs: ['repo/docs/marks/geo.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
