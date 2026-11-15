// Vizzu example: a style value set to null goes back to its default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reset a font size to its default',
  summary:
    'The chart starts with a 50px title. Setting title.fontSize to null does not mean zero: the title returns to the size Vizzu computes for this chart.',
  section: 'Color palette & fonts',
  tags: ['style', 'title.fontSize', 'null'],
  docs: [
    'repo/docs/tutorial/color_palette_fonts.md',
    'repo/docs/tutorial/color_palette_fonts/02_b.js',
    'repo/docs/tutorial/color_palette_fonts/03_a.js',
    'repo/docs/tutorial/color_palette_fonts/03_b.js',
    'repo/docs/tutorial/assets/setup/setup_c.js',
    'repo/docs/assets/data/music_data.js',
    'repo/src/apps/weblib/typeschema-api/styles.yaml',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
