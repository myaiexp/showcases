// tanstack-charts example: Palette tokens on the container
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Palette tokens on the container',
  summary:
    'The default categorical colors are six CSS custom properties, --ts-chart-1 to --ts-chart-6. Setting them on the chart container rebrands every series without rebuilding the definition, and the change reaches the chart at once.',
  section: 'Themes and Styling',
  tags: ['--ts-chart-N', 'palette', 'CSS variables'],
  docs: ['repo/docs/guides/themes-and-styling.md', 'repo/docs/reference/marks/bar-and-rect.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
