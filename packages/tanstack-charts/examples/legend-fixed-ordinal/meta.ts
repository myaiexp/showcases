// tanstack-charts example: A fixed ordinal scale keeps colors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A fixed ordinal scale keeps colors',
  summary:
    'With an application-owned ordinal scale each package keeps its color when a series is filtered out, because the domain order and paint belong to the scale and not to the data that happens to be present. Hiding react leaves core blue and octane green.',
  section: 'Legends and Color',
  tags: ['scaleOrdinal', 'color.scale', 'domain', 'range', 'colorLegend'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
