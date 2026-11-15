// Vizzu example: feature cssProperties reads --vizzu-… custom properties from a stylesheet
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Style from CSS custom properties',
  summary:
    "With the cssProperties feature on, Vizzu reads --vizzu-… custom properties from the page's CSS at each animate() call. A class on the chart element carries a palette and a 50px title; adding it changes the chart on the next animation.",
  section: 'Color palette & fonts',
  tags: ['feature', 'cssProperties', 'style'],
  docs: [
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/01_a.js',
    'repo/docs/tutorial/color_palette_fonts/02_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/ts-api/plugins/cssproperties.ts',
    'repo/src/apps/weblib/ts-api/plugins/cssutils.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
