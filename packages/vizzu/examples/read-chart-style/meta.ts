// Vizzu example: chart.style returns the style the chart is using right now
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Read chart.style',
  summary:
    'The style property holds the actual style settings of the chart, defaults included. The side panel prints a few of them before and after a palette and a title font size are set, so you can see the values the chart resolved.',
  section: 'Color palette & fonts',
  tags: ['chart.style', 'style', 'colorPalette', 'fontSize'],
  docs: [
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/01_a.js',
    'repo/docs/tutorial/color_palette_fonts/01_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
