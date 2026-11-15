// tanstack-charts example: Automatic categorical legend
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Automatic categorical legend',
  summary:
    'A mark with z and no fill takes its series colors from the theme palette, and colorLegend reads the resolved color scale into labeled swatches. The legend reserves its own height above or below the plot, and the toggle moves it with placement.',
  section: 'Legends and Color',
  tags: ['colorLegend', 'z', 'placement', 'color.legend'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
